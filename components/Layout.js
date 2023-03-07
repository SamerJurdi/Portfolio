import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import useWindowDimensions from '../hook/useWindowDimensions'
import { NavBar } from '../containers'
import getStyles from '../styles/home.module.css'

const originalNavItems = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "https://www.pythys.com/portfolio" },
    { title: "User Module", path: "/user" },
    { title: "E-commerce Module", path: "/ecommerce" },
    { title: "Auction Module", path: "/auctions" },
]
const originalUserItems = [
    { title: "User Info", path: "/user" },
    { title: "Store", path: "/ecommerce" },
    { title: "Transaction History", path: "/transaction-history" },
    { title: "Auctions", path: "/auctions" },
]
export default function Layout(props) {
    const {
        children,
        navItems = originalNavItems,
        userItems = originalUserItems,
        isLoggedIn = false,
        refreshLayout,
    } = props
    const { height } = useWindowDimensions()
    const ref = useRef(null)
    const styles = getStyles()
    const [layoutHeight, setLayoutHeight] = useState(ref.current?.clientHeight)

    useEffect(() => {
        setLayoutHeight(ref.current?.clientHeight)
    }, [refreshLayout])

	return (
        <div ref={ref} style={layoutHeight > height ? { position: 'relative' } : {}}>
			<Head>
				<title>Samer Jurdi's Portfolio</title>
				<link rel="icon" href="/logo.svg" /* logo => Next.js icon by icons8.com */ />
			</Head>
			<Image
                alt="Background Pattern"
                src="/subtle-prism.svg" /* Background by SVGBackgrounds.com */
                quality="100"
                fill
                priority
                style={{
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            />
            <NavBar navItems={navItems} userItems={userItems} isLoggedIn={isLoggedIn} />
            <br/>
            <div style={styles.container}>
                <div style={ styles.main }>
                    { children }
                </div>
            </div>
		</div>
	)
}
