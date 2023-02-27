import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/config/withSession'

const argon2 = require('argon2');

export default withSessionRoute(login)

async function login(req, res) {
	if (req.method === "POST") {
		const {
			email: Email,
			password
		} = req.body

		async function updateLoginAttempts(UserId, RemainingAttempts) {
			await prisma.UserAccount.update({
				where: {
					UserId,
				},
				data: {
					RemainingAttempts,
				},
			})
		}

		// Fetch the user info using their email
		const user = await prisma.UserAccount.findUnique({
			where: {
				Email,
			}
		})
		if (user.Email) {
			if (user.RemainingAttempts > 0) {
				// Compare the user's stored hash with the given password
				try {
					if (await argon2.verify(user.HashKey, password)) {
						// Empty current session incase it has old data then repopulate
						req.session.destroy()
						req.session.user = { userId: user.UserId }
						await req.session.save()
						await updateLoginAttempts(user.UserId, 5)
						res.status(200).send({ message: 'Login Successful', redirect: '/' })
					} else {
						await updateLoginAttempts(user.UserId, user.RemainingAttempts - 1)
						res.status(200).send({ error: true, message: 'Login Failed' })
					}
				} catch (error) {
					res.status(200).send({ error, message: 'Error: ' + error })
				}
			} else res.send(200).send({ error: true, message: 'Account Locked' })
		} else res.send(200).send({ error: true, message: 'User not found' })
	} else return res.status(404).send({ error: true })
}