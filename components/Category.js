import { useState } from 'react'
import getStyles from '../styles/home.module.css'

export default function Category(props) {
	const { categoryName, onClick, isSelected } = props
	const styles = getStyles()
	const [isHovering, setIsHovering] = useState(false)

	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			style={{
				...(styles.category),
				...((isHovering || isSelected) && styles.categorySelected)
			}}>
			<b>{categoryName}</b>
		</div>
	)
}