import { useState } from 'react'
import Link from 'next/link'
import getStyles from '../styles/home.module.css'

export default function Card({ children, url = '/' }) {
    const styles = getStyles()
	const [isSelected, setIsSelected] = useState(false)
	return (
	<div style={styles.cardContainer}>
		<Link href={url} style={styles.cardLink}>
			<div
				onMouseEnter={() => setIsSelected(true)}
				onMouseLeave={() => setIsSelected(false)}
				onClick={() => setIsSelected(true)}
				onMouseUp={() => setIsSelected(false)}
				style={{
					...styles.card,
					...(isSelected && styles.cardSelected),
				}}>
				{ children }
			</div>
		</Link>
	</div>
	)
}