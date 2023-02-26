export default function handle(req, res) {
	const {password} = req.body
	console.log('SERVER')
	console.log(password)
	res.status(200).send({response: 'Hashed Key'})
}