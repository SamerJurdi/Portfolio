import { useState } from 'react'
import { Login, Signup } from '../containers'
import {Layout} from '../components'
import { handleResponse } from '../lib/common'
import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

export default function user() {
	const [isSignupVisible, setIsSignupVisible] = useState(false)
	const [isLoginVisible, setIsLoginVisible] = useState(true)
	const [hashedKey, setHashedKey] = useState('')
	const [testPassword, setTestPassword] = useState('')

	function showSignUp() {
		setIsSignupVisible(true)
		setIsLoginVisible(false)
	}
	function showLogin() {
		setIsLoginVisible(true)
		setIsSignupVisible(false)
	}
	function hashPassword() {
		const objectWithData = {
			password: testPassword,
		}
		fetch('/api/hashPassword', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(objectWithData),
		}).then(async response => {
			let res = await response.json()
			setHashedKey(res.response)
			handleResponse(res)
		})
	}

	return (
		<Layout position="inherit">
			<h1 style={{ textAlign: 'center' }}>User Module</h1>
			<div style={{ display: 'flex' }}>
				<button style={{
					...userStyles.tabButton,
					...(isSignupVisible ? userStyles.tabButtonSelectedL : {})
				}} onClick={showSignUp}>Sign Up</button>
				<button style={{
					...userStyles.tabButton,
					...(isLoginVisible ? userStyles.tabButtonSelectedR : {})
				}} onClick={showLogin}>Log in</button>
			</div>
			<br/>
			<div>
				{isSignupVisible && <Signup />}
				{isLoginVisible && <Login />}
			</div>

			<br />
			<br />
			<div style={{ textAlign: 'center' }}>
				<h3>Hashing demo</h3>
				<div>
					<div style={userStyles.row}>
						<input style={userStyles.input} onChange={(e) => setTestPassword(e.target.value)} />
						<button onClick={hashPassword}>Test</button>
					</div>
					<br/>
					<div>
						{hashedKey}
						{!hashedKey && 'Enter a value above to see how its saved in the database'}
					</div>
				</div>
			</div>
		</Layout>
	)
}