import Link from 'next/link'
import { Layout, Card } from '../components'

export default function index() {

	return (
	<Layout>
		<div>
			<h1 style={{textAlign: 'center'}}>Welcome to my portfolio</h1>
			<br/>
			<br/>
			<div style={{textAlign: 'center'}}>
				During the past few years, I implemented countless features on a number of websites and mobile apps.
			</div>

			<br/>
			<div>
				<h4>I took part in several <Link href='https://www.pythys.com/portfolio'><b>projects</b></Link></h4>
				<p>In the span of 3 years I worked with <a href="https://www.pythys.com/">Pythys</a> and shared alot of their success.
				It is mainly where I gained most of my expertise having to work on both web and mobile apps.
				My most recent experience is with <a href="https://www.gigtakaful.com.kw/">GIG - Takaful</a>, single-handedly working on a new web app solution from A to Z.
				Currently in its final stage of development but I can't share its content yet.
				</p>
			</div>

			<h2>Features Demo</h2>

			<Card url='/user'>
				<div>Check out the <b>User Module</b></div>
				<p>I use Formik forms with Yup validation in Login and Signup.
				As for keeping passwords secure, I used argon hashing algorithm.
				Once you login I use iron-session to keep track of your user between pages.</p>
			</Card>
			
			<Card url='/ecommerce'>
				<div>Next up is the <b>E-commerce Module</b></div>
				<p>Once logged in, you will be allowed to purchase products, gain points in your wallet and review transaction history</p>
				<ol>
					<li>Log in</li>
					<li>Find a package you like</li>
					<li>Buy Now</li>
					<li>Pay (Demo: Test success and failure cases)</li>
					<li>Review order history</li>
				</ol>
			</Card>
			
			<Card url='/auctions'>
				<div>My most recent work, the <b>Auction Module</b></div>
				<p>Logged in users can join several auctions at once and bid instantly.
				I use a wallet system to secure the payment and prevent bidders exploiting the instant bid feature.
				Users may withdraw from an auction if they are no longer the highest bidders.
				</p>
			</Card>

		</div>
	</Layout>
	)
}