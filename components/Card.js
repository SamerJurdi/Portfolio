import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import getStyles from '../styles/Home.module.css'

export default function Card({ children, url = '/' }) {
    const styles = getStyles()
	const [isHovering, setIsHovering] = useState(false)
	return (
	<div style={styles.cardContainer}>
		<Link href={url} style={styles.card}>
			<div
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onClick={() => setIsHovering(true)}
				onMouseUp={() => setIsHovering(false)}
				style={{
					...(isHovering ? {border: '1px solid gray'} : {border: 'none'}),
					...{ borderRadius: '20px', paddingTop: '20px', paddingRight: '20px', paddingLeft: '20px' }
				}}>
				{ children }
				{/* TODO: Add arrow pointing to the right side */}
			</div>
		</Link>
	</div>
	)
}