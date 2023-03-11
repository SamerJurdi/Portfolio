import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/config/withSession'

export default withSessionRoute(getRealCurrencies)

async function getRealCurrencies(req, res) {
	let selectedCurrency = 2
	const UserId = req.session.user?.userId
	if (UserId) {
		await prisma.UserAccount.findUnique({
			where: { UserId },
			include: {
				Currency: true,
			}
		}).then(response => selectedCurrency = response.Currency.CurrencyId)
	}

	const currencyList = await prisma.Currency.findMany({
		where: {
			TypeId: 2,
		},
	})

	res.status(200).send({ currencyList, selectedCurrency })
}