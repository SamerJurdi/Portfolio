import Link from 'next/link'
import {Layout} from '../components'

export default function index() {
	return (
	<Layout>
		<div>
			<div style={{textAlign: 'center'}}>Welcome to my Demo</div>
			<br/>
			<br/>
			<div>
				During the past few years, I took part in implementing countless features on many websites and a few mobile apps.
			</div>
			<br/>
			<div>
				<p>Check out the <Link href='/user'>User Module</Link></p>
				<p>I use Formik forms with Yup validation in Login and Signup.
				As for keeping passwords secure, I used argon hashing algorithm.
				Once you login I use iron-session to keep track of your user between pages.</p>
			</div>

			<br/>
			<div>
				<p>Next up is the <Link href='/ecommerce'>E-commerce Module</Link></p>
				<p>Once logged in, you will be allowed to add products to your cart and complete the checkout proccess</p>
				<ol>
					<li>Login</li>
					<li>Add to cart</li>
					<li>Checkout</li>
					<li>Pay (Demo: Test success and failure cases)</li>
					<li>Review order history</li>
				</ol>
			</div>
			
			<br/>
			<div>
				<p>My most recent work, the <Link href='/auctions'>Auction Module</Link></p>
				<p>Logged in users can join several auctions at once and bid instantly.
				I use a wallet system to secure the payment and prevent bidders exploiting the instant bid feature.
				Users may withdraw from an auction if they are no longer the highest bidders.
				</p>
			</div>

			<br/>
			<div>
				<p>I took part in several <Link href='/projects'>projects</Link></p>
				<p>In the span of 3 years I had been working with <a href="https://www.pythys.com/">Pythys</a> and shared alot of their success.
				It is also where I gained most of my expertise having to work on both web and mobile apps.
				My most recent experience is with <a href="https://www.gigtakaful.com.kw/">GIG - Takaful</a>, single-handedly working on a new web app solution from scratch. It is in its final stage of development but I can't share its content yet.
				</p>
				
			</div>

		</div>
	</Layout>
	)
}