const argon2 = require('argon2');

export default async function handle(req, res) {
	if (req.method === "POST") {
		const {password} = req.body
		console.log('SERVER')
		console.log(password)

		let hash = 'Hashed Key'
		try {
			if (password) {
				hash = await argon2.hash(password)
				res.status(200).send({ response: hash })
			} else res.status(200).send({error: true, message: 'Enter a test password'})
		} catch (err) {
			console.log('ERROR')
		}
	} else return res.status(404).send({ error: true })
}