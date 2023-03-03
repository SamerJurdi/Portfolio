import { useState } from 'react'
import getStyles from '../styles/home.module.css'

export default function Category({ category, onClick, isSelected }) {
	const styles = getStyles()
	const [isHovering, setIsHovering] = useState(false)

	return (
		<div key={category.CategoryId}
			onClick={() => onClick(category.CategoryId)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			style={{
				...(styles.category),
				...((isHovering || isSelected) && styles.categorySelected)
			}}>
			<b>{category.Name}</b>
		</div>
	)
}