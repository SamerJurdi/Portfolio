import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/config/withSession'

export default withSessionRoute(handle)

async function handle(req, res) {
	if (req.method === "GET") {
		const UserId = req.session.user?.userId
		if (UserId) {
			await prisma.InvoiceReference.findMany({
				where: {
					OR: [
						{
							FromUserId: {
								equals: UserId,
							},
						},
						{
							ToUserId: {
								equals: UserId,
							},
						},
					]
				},
				orderBy: [
					{
						CreatedDate: 'desc',
					},
				],
				include: {
					Status: true,
					Currency: true,
				}
			}).then(response => {
				let userTransactions = response.map(item => {
					let Value = item.FromUserId == UserId ? parseFloat(item.Value) : parseFloat(item.Value) * -1
					return {...item, Value}
				})
				res.status(200).send({ userTransactions })
			})
		} else { res.status(200).send({ error: true, message: 'You must be logged in', redirect: '/user' }) }
	} else return res.status(404).send({ error: true })
}