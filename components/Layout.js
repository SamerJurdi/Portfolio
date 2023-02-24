import Head from 'next/head'
import Image from 'next/image'
import getStyles from '../styles/Home.module.css'

export default function Layout({ children }) {
    const styles = getStyles()
	return (
		<div>
			<Head>
				<title>This is a title</title>
				<link rel="icon" href="/logo.svg" /* logo => Next.js icon by icons8.com */ />
			</Head>
			<Image
                alt="Background Pattern"
                src="/subtle-prism.svg" /* Background by SVGBackgrounds.com */
                quality="100"
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            />
            <div style={styles.container}>
                <div style={ styles.main }>
                    { children }
                </div>
            </div>
		</div>
	)
}