import { withSessionRoute } from '../../../lib/config/withSession'

export default withSessionRoute(handle);

async function handle(req, res) {
    req.session.destroy()
    res.status(200).send({ redirect: '/' })
}