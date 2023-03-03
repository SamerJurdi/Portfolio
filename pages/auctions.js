import { withSessionSsr } from '../lib/config/withSession'
import { Layout } from "../components"

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		if (user) {
			return {
				props: {
					isLoggedIn: true,
				},
			}
		} else {
			return {
				props: {
					isLoggedIn: false,
				},
			}
		}
	}
)
// TODO: Auction Module
export default function user({ isLoggedIn }) {
	return (
		<Layout position="inherit" isLoggedIn={isLoggedIn}>
			<h1 style={{ textAlign: 'center' }}>Auction Module</h1>
			<h2 style={{ textAlign: 'center' }}><i>In Progress</i></h2>
		</Layout>
	)
}