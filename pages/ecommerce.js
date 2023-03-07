import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withSessionSsr } from '../lib/config/withSession'
import { handleResponse } from '../lib/common'
import { Layout, Category, ProductCard } from '../components'
import getStyles from '../styles/home.module.css'

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

export default function ecommerce({ isLoggedIn }) {
	const router = useRouter()
	const styles = getStyles()
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	function getCategoryProducts(categoryId) {
		let myList = categories.map(category => {
			let IsSelected = category.CategoryId == categoryId

			return { ...category, IsSelected }
		})
		myList.length > 0 && setCategories(myList)
	}
	async function buyProduct(productId, priceId) {
		if (isLoggedIn) {
			const isPaid = confirm('Agree to simulate successful purchase and cancel for failed purchase')
			setIsLoading(true)
			const objectWithData = { productId, priceId, isPaid }
			return fetch('/api/invoiceProduct', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(objectWithData),
			}).then(async response => setTimeout(async () => {
				setIsLoading(false)
				handleResponse(await response.json(), router)
			}, 1000)) // Timeout is to give the server time to update the database
		} else {
			alert('You must be logged in to purchase')
			router.push('/user')
		}
	}
	
	useEffect(() => {
        fetch("/api/getPackageCategories", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
			.then(async response => {
                let resp = await response.json()
				setCategories(resp.categories)
				setIsLoading(false)
				handleResponse(resp, router)
            })
	}, [])
	if (isLoading) return <div>Loading</div> // TODO: add loading animation
	return (
		<Layout isLoggedIn={isLoggedIn}>
			<h1 style={{ textAlign: 'center' }}>E-commerce Module</h1>
			<h3 style={{ textAlign: 'center' }}>Select a package that best suits you!</h3>
			<div>
				<div style={styles.categories}>
					{categories.length > 0 && categories.map(category => (
						<Category key={category.CategoryId}
							categoryName={category.Name}
							onClick={() => getCategoryProducts(category.CategoryId)}
							isSelected={category.IsSelected} />
					))}
				</div>
				<br />
				{<div className="products">
					{categories.find(category => category.IsSelected)
						?.Products.map(product =>
							<ProductCard key={product.ProductId}
								productName={product.Name}
								productImage={product.DisplayImage}
								discountPrice={product.DiscountPrice}
								currentPrice={product.CurrentPrice}
								onClick={() =>
									buyProduct(
										product.ProductId,
										product.DiscountPrice?.PriceId || product.CurrentPrice.PriceId
									)}
							/>
						)
					}
				</div>}
			</div>
		</Layout>
	)
}