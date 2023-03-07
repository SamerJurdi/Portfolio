import { useState } from 'react'
import Image from 'next/image'
import getStyles from '../styles/home.module.css'

export default function ProductCard(props) {
    const {
        productName,
        productImage,
        discountPrice,
        currentPrice,
        onClick,
    } = props
    const styles = getStyles()
    const [isButtonLit, lightButton] = useState(false)

    return (<div style={styles.productCard}>
        <Image width="100" height="100" src={productImage || '/NoImage.svg'} alt="" />
        <div style={{ display: 'grid', alignItems: 'center', gridTemplateRows: '1fr' }}>
            <div style={{ textAlign: 'center' }}>{productName}</div>
        </div>
        <div
            style={{
                ...styles.buyNowContainer,
                ...(!discountPrice?.Price && { gridTemplateRows: '1fr 1fr' })
            }}
        >
            {discountPrice?.Price
                ? <s style={{ textAlign: 'center', color: 'red' }}>
                    {currentPrice.Currency.Name}  {currentPrice.Price}</s>
                : <div style={{ textAlign: 'center', color: 'green' }}>
                    {currentPrice.Currency.Name} {currentPrice.Price}</div>}
            {discountPrice?.Price
                && <div style={{ textAlign: 'center', color: 'green' }}>
                    {discountPrice?.Currency.Name} {discountPrice?.Price}</div>}
            <button
                style={{
                    ...styles.buyNowButton,
                    ...(isButtonLit ? { background: 'lightgreen' } : {})
                }}
                onClick={onClick}
                onMouseEnter={() => lightButton(true)}
                onMouseLeave={() => lightButton(false)}
            >Buy Now</button>
        </div>
    </div>)
}