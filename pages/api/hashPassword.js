const argon2 = require('argon2');

export default async function handle(req, res) {
	if (req.method === "POST") {
		const {password} = req.body

		let hash = 'Hashed Key'
		try {
			if (password) {
				hash = await argon2.hash(password)
				res.status(200).send({ response: hash })
			} else res.status(200).send({error: true, message: 'Enter a test password'})
		} catch (error) {
			res.status(200).send({ error, message: 'Error: ' + error })
		}
	} else return res.status(404).send({ error: true })
}