import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import getStyles from '../styles/home.module.css'

export default function Card({ children, url = '/' }) {
    const styles = getStyles()
	const [isHovering, setIsHovering] = useState(false)
	return (
	<div style={styles.cardContainer}>
		<Link href={url} style={styles.cardLink}>
			<div
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onClick={() => setIsHovering(true)}
				onMouseUp={() => setIsHovering(false)}
				style={{
					...styles.card,
					...(isHovering && styles.cardSelected),
				}}>
				{ children }
				{/* TODO: Add arrow pointing to the right side, from fontawesome */}
			</div>
		</Link>
	</div>
	)
}