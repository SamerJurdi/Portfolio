import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/config/withSession'

export default withSessionRoute(handle)

async function handle(req, res) {
	if (req.method === "GET") {
		const UserId = req.session.user?.userId
		if (UserId) {
			await prisma.UserWallet.findMany({
				where: {
					UserId,
				},
				include: {
					Currency: true,
				}
			}).then(response => res.status(200).send({ userWalletItems: response }))
		} else { res.status(200).send({ error: true, message: 'You must be logged in', redirect: '/user' }) }
	} else return res.status(404).send({ error: true })
}