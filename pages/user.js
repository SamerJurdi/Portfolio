import { useState } from 'react'
import { useRouter } from 'next/router'
import { withSessionSsr } from '../lib/config/withSession'
import { Login, Signup } from '../containers'
import {Layout} from '../components'
import { handleResponse } from '../lib/common'
import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

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

export default function user({ isLoggedIn }) {

	const router = useRouter()
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
		fetch('/api/authorization/hash-password', {
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
	function logOut() {
		fetch('/api/authorization/logout', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(async response => handleResponse(await response.json(), router))
	}

	return (
		<Layout position="inherit" isLoggedIn={isLoggedIn}>
			<h1 style={{ textAlign: 'center' }}>User Module</h1>
			{!isLoggedIn && <div>
				<div style={{ display: 'flex' }}>
					<button style={{
						...userStyles.tabButton,
						...(isSignupVisible ? userStyles.tabButtonSelectedL : {})
					}} onClick={showSignUp}>Sign Up</button>
					<button style={{
						...userStyles.tabButton,
						...(isLoginVisible ? userStyles.tabButtonSelectedR : {})
					}} onClick={showLogin}>Log In</button>
				</div>
				<br/>
				<div>
					{isSignupVisible && <Signup />}
					{isLoginVisible && <Login />}
				</div>
			</div>}
			{isLoggedIn && <div style={{ textAlign: 'center' }}>
				<button style={userStyles.button} onClick={logOut}>Log Out</button>
			</div>}

			<br />
			<br />
			<div style={{ textAlign: 'center' }}>
				<h3>Hashing demo</h3>
				<div>
					<div style={userStyles.row}>
						<input style={userStyles.input} onChange={(e) => setTestPassword(e.target.value)} />
						<button style={userStyles.button} onClick={hashPassword}>Test</button>
					</div>
					<br/>
					<div style={{ wordWrap: 'break-word' }}>
						{hashedKey}
						{!hashedKey && 'Enter a value above to see how its saved in the database'}
					</div>
				</div>
			</div>
		</Layout>
	)
}