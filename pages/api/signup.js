import prisma from '../../lib/prisma'
const argon2 = require('argon2');

export default async function handle(req, res) {
	if (req.method === "POST") {
		const {
			firstName: FirstName,
			lastName: LastName,
			email: Email,
			password,
		} = req.body

		// Check if email is already used
		const user = await prisma.UserAccount.findUnique({
			where: {
				Email,
			},
		})
		if (!user) {
			try {// Hash password before creating the account
				const HashKey = await argon2.hash(password)
				await prisma.UserAccount.create({
					data: {
						FirstName,
						LastName,
						Email,
						HashKey,
					}
				}).then(async response => {
					// Empty current session incase it has old data then repopulate
					req.session.destroy()
					req.session.user = { userId: await response.UserId }
					await req.session.save()
					res.status(200).send({redirect: '/'})
				})
			} catch (err) {
				res.status(200).send({ error, message: 'Error: ' + error })
			}
		} else res.status(200).send({ error: true, message: 'You already have an account!' })
	} else return res.status(404).send({ error: true })
}