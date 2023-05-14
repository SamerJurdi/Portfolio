import { useState, useEffect } from 'react';
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

export default function transactionHistory({ isLoggedIn }) {
	const [userTransactions, setUserTransactions] = useState([])
	const [refreshLayout, setRefreshLayout] = useState(false)
	useEffect(() => {
		fetch("/api/ecommerce/transactions", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then(async response => {
			let resp = await response.json()
			setUserTransactions(resp.userTransactions)
			setRefreshLayout(!refreshLayout)
		})
	}, [])
	return (
		<Layout position="inherit" isLoggedIn={isLoggedIn} refreshLayout={refreshLayout}>
			<h1 style={{ textAlign: 'center' }}>Transaction History</h1>

			<div className="transactionRecord">
				<b>Invoice ID</b>
				<b>Currency</b>
				<b>Value</b>
				<b>Status</b>
				<b>Date</b>
			</div>
			<br/>
			<div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
			{userTransactions.length > 0 && userTransactions.map(userTransaction => {
				return (
					<div key={userTransaction.InvoiceId} className="transactionRecord">
						<div>{userTransaction.InvoiceId}</div>
						<div>{userTransaction.Currency.Name}</div>
						<div>{userTransaction.Value}</div>
						<div>{userTransaction.Status.Name}</div>
						<div>{userTransaction.CreatedDate.split("T")[0]}</div>
					</div>
				)
			})}
			</div>
		</Layout>
	)
}