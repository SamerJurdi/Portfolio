import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/config/withSession'

export default withSessionRoute(invoiceProduct)

async function invoiceProduct(req, res) {
	if (req.method === "POST") {
		const UserId = req.session.user?.userId
		if (UserId) {
			const {
				currencyId,
			} = req.body
			const CurrencyId = parseInt(currencyId)

			await prisma.UserAccount.update({
				where: { UserId },
				data: { CurrencyId }
			})

			res.status(200).send({})
		} else { res.status(200).send({ error: true }) }
	} else return res.status(404).send({ error: true })
}