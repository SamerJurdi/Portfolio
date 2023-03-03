import { useState } from 'react'
import Image from 'next/image'
import getStyles from '../styles/home.module.css'

export default function ProductCard({ product, onClick }) {
    const styles = getStyles()
    const [isButtonLit, lightButton] = useState(false)
    const discount = product.DiscountPrice
    const currentPrice = product.CurrentPrice

    return (<div style={styles.productCard}>
        <Image width="100" height="100" src={product?.DisplayImage || '/NoImage.svg'} alt="" />
        <div style={{ display: 'grid', alignItems: 'center', gridTemplateRows: '1fr' }}>
            <div style={{ textAlign: 'center' }}>{product.Name}</div>
        </div>
        <div
            style={{
                ...styles.buyNowContainer,
                ...(!discount?.Price && { gridTemplateRows: '1fr 1fr' })
            }}
        >
            {discount?.Price
                ? <s style={{ textAlign: 'center', color: 'red' }}>
                    {currentPrice.Currency.Name}  {currentPrice.Price}</s>
                : <div style={{ textAlign: 'center', color: 'green' }}>
                    {currentPrice.Currency.Name} {currentPrice.Price}</div>}
            {discount?.Price
                && <div style={{ textAlign: 'center', color: 'green' }}>
                    {discount?.Currency.Name} {discount?.Price}</div>}
            <button
                style={{
                    ...styles.buyNowButton,
                    ...(isButtonLit ? { background: 'lightgreen' } : {})
                }}
                onClick={() => {
                    onClick(product.ProductId, discount?.PriceId || currentPrice.PriceId)
                }}
                onMouseEnter={() => lightButton(true)}
                onMouseLeave={() => lightButton(false)}
            >Buy Now</button>
        </div>
    </div>)
}