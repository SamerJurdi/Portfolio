import { useState } from 'react'
import getStyles from '../styles/home.module.css'

export default function Category(props) {
	const { categoryId, categoryName, onClick, isSelected } = props
	const styles = getStyles()
	const [isHovering, setIsHovering] = useState(false)

	return (
		<div key={categoryId}
			onClick={() => onClick(categoryId)}
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