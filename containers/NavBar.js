import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { handleResponse } from '../lib/common'
import getStyles from '../styles/home.module.css'

export default function NavBar({ navItems, userItems, isLoggedIn }) {
    const router = useRouter()
    const styles = getStyles({ showUserDrawer: isLoggedIn })
    const [isNavActive, setIsNavActive] = useState(false)
    const [userDrawerIsOpen, setUserDrawerIsOpen] = useState(false)
    const [userWalletItems, setUserWalletItems] = useState([])

    function logOut() {
        fetch("/api/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(async response => handleResponse(await response.json(), router))
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetch("/api/userWallet", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }).then(async response => {
                let resp = await response.json()
                setUserWalletItems(resp.userWalletItems)
            })
        } else setUserWalletItems([])
    }, [isLoggedIn])

    return (
        <header onWheel={() => {
            setIsNavActive(false)
            setUserDrawerIsOpen(false)
        }}>
            <nav style={styles.nav}>
                <FontAwesomeIcon icon={faBars} style={styles.navBars}
                    onClick={() => {
                        setIsNavActive(!isNavActive)
                        setUserDrawerIsOpen(false)
                    }}
                />
                <div style={{
                    ...styles.navList,
                    ...(isNavActive ? {left: '0'} : {})
                }}>
                    {navItems.map((menu, index) => (
                        <Link key={index} href={menu.path} style={{color: 'inherit', textDecoration: 'inherit'}}>
                            <div onClick={() => setIsNavActive(false)}>
                                <b>{menu.title}</b>
                            </div>
                        </Link>
                    ))}
                </div>

                <FontAwesomeIcon icon={faUser} style={styles.navUser}
                    onClick={() => {
                        setUserDrawerIsOpen(!userDrawerIsOpen)
                        setIsNavActive(false)
                    }}
                />
                <div style={{
                    ...styles.userDrawer,
                    ...(userDrawerIsOpen ? {right: '0'} : {})
                }}>
                    <div style={styles.userNav}>
                        {userItems.map((menu, index) => (
                            <Link key={index} href={menu.path} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                <div onClick={() => setUserDrawerIsOpen(false)}>
                                    <b>{menu.title}</b>
                                </div>
                            </Link>
                        ))}
                        <div style={{ cursor: 'pointer' }} onClick={logOut}><b>Log Out</b></div>
                    </div>
                    <div style={styles.userNav}>
                        <div><b>Wallet</b></div>
                        {userWalletItems?.length > 0
                            ? userWalletItems.map((userCurrency, index) =>
                                <div key={index} style={styles.walletItems}>
                                    <div>{userCurrency.Currency.Description}:</div>
                                    <div><i>{userCurrency.Value} {userCurrency.Currency.Name}</i></div>
                                </div>
                            )
                            : <div style={{ paddingLeft: '20px' }}>
                                <Link href="/ecommerce" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                    Add Funds
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}
