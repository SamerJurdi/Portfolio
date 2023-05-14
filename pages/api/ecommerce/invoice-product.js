import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/config/withSession'

export default withSessionRoute(handle)

async function handle(req, res) {
	if (req.method === "POST") {
		const UserId = req.session.user?.userId
		if (UserId) {
			const {
				productId,
				priceId,
				isPaid, // For demo purposes we are simulating the result of a purchase
			} = req.body

			const ProductId = parseInt(productId)
			const PriceId = parseInt(priceId)
			const now = new Date()
			const product = await prisma.Product.findUnique({
				where: {
					ProductId,
				},
				include: {
					ProductPrice: {
						where: {
							OR: [
								{
									ExpiryDate: {
										gt: now,
									},
								},
								{
									ExpiryDate: {
										equals: null,
									},
								},
							],
						},
						orderBy: [
							{
								Price: 'desc',
							},
						],
						include: {
							Currency: true,
						}
					}
				}
			})
			const price = product.ProductPrice.find(prodPrice => prodPrice.PriceId == PriceId)
			const StatusId = isPaid ? 1 : 2
			const userWallet = await prisma.UserWallet.findMany({
				where: {
					UserId,
				},
			})

			async function updateUserWallet(CurrencyId, value, isCredit) {
				const Value = isCredit ? (value * -1) : value
				let currencyWallet = userWallet.find(wallet => wallet.CurrencyId == CurrencyId)
				if (currencyWallet) {
					await prisma.UserWallet.update({
						where: {
							UserId_CurrencyId: {
								UserId,
								CurrencyId,
							}
						},
						data: {
							Value: parseFloat(currencyWallet.Value) + Value
						}
					})
				} else {
					await prisma.UserWallet.create({
						data: {
							UserId,
							CurrencyId,
							Value,
						}
					})
				}
			}
			async function generateInvoice(FromUserId, ToUserId, CurrencyId, Value, Amount = 1) {
				await prisma.InvoiceReference.create({
					data: {
						FromUserId,
						ToUserId,
						StatusId,
						CurrencyId,
						Value: Value * Amount,
					}
				}).then(async InvoiceReference => {
					let InvoiceId = await InvoiceReference.InvoiceId
					isPaid && await updateUserWallet(CurrencyId, Value, ToUserId == UserId)
					await prisma.InvoiceItem.create({
						data: {
							InvoiceId,
							ProductId,
							Amount,
							Value,
						}
					})
				})
			}

			if (product.TypeId == 1) {// If purchasing a virtual currency
				generateInvoice(null, UserId, price.CurrencyId, parseFloat(price.Price)) // Invoice to user deducting from their balance
				const virtualValue = product.ProductPrice.find(prodPrice => prodPrice.TypeId == 11) // The amount of virtual points awarded on purchase, based on currency
				isPaid && virtualValue?.Price && generateInvoice(UserId, null, virtualValue.CurrencyId, parseFloat(virtualValue.Price)) // Invoice from user adding to their balance
			} else generateInvoice(null, UserId, price.CurrencyId, parseFloat(price.Price))

			res.status(200).send({ message: isPaid ? 'Purchase Successful' : 'Purchase Failed', redirect: '/transaction-history' })
		} else { res.status(200).send({ error: true, message: 'You must be logged in to purchase', redirect: '/user' }) }
	} else return res.status(404).send({ error: true })
}