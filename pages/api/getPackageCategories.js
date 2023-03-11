import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/config/withSession'

export default withSessionRoute(getPackageCategories)

async function getPackageCategories(req, res) {
	const { currencyId } = req.query
	console.log('Server')
	console.log(currencyId)
	let CurrencyId = currencyId ? parseInt(currencyId) : 2
	const UserId = req.session.user?.userId
	if (UserId && !currencyId) {
		await prisma.UserAccount.findUnique({
			where: { UserId },
			include: {
				Currency: true,
			}
		}).then(response => CurrencyId = response.Currency.CurrencyId)
	}
	const now = new Date()
	const categories = await prisma.Category.findMany({
		where: {
			ParentCategoryId: 4,
		},
		include: {
			ProductCategory: {
				include: {
					Product: {
						include: {
							ProductPrice: {
								where: {
									AND: {
										CurrencyId,
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
								},
								orderBy: [
									{
										Price: 'desc',
									},
								],
								include: {
									Currency: true,
								},
							},
							ProductContent: true,
						}
					}
				}
			},
		},
	})

	let enhancedCategories = categories.map((category, index) => {
		let Products = category.ProductCategory.map(ProductCategory => {
			let CartImage = ProductCategory.Product.ProductContent.find(content => content.TypeId == 6)
			let DisplayImage = ProductCategory.Product.ProductContent.find(content => content.TypeId == 7)
			let CurrentPrice = ProductCategory.Product.ProductPrice.find(price => price.TypeId == 9)
			let DiscountPrice = ProductCategory.Product.ProductPrice.find(price => price.TypeId == 10)
			return { ...ProductCategory.Product, CartImage, DisplayImage, CurrentPrice, DiscountPrice }
		})

		return { ...category, IsSelected: index == 0, Products }
	})
	res.status(200).send({ categories: enhancedCategories })
}