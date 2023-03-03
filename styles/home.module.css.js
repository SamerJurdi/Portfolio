export default function getStyles(props) {
	const direction = props?.direction ? props.direction : 'ltr' // TODO: Implement localization
	const showUserDrawer = props?.showUserDrawer ? props.showUserDrawer : false

	return {
		container: {
			paddingLeft: '10%',
			paddingRight: '10%',
			paddingBottom: '5%',
		},
		main: {
            justifyContent: 'center',
		},
		cardContainer: {paddingTop: '10px', paddingBottom: '10px'},
		cardLink: {
			color: 'inherit',
			textDecoration: 'inherit',
			borderRadius: '20px',
		},
		card: {
			borderRadius: '20px',
			paddingTop: '20px',
			paddingRight: '20px',
			paddingLeft: '20px',
			border: '1px dotted gray',
		},
		cardSelected: {border: '1px solid black'},
		nav: {
			display: 'flex',
			padding: '16px',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: 'lightblue',
			height: '60px',
		},
		navUser: showUserDrawer ? {maxHeight: '30px'} : { display: 'none' },
		navList: {
			display: 'flex',
			flexDirection: 'column',
			position: 'fixed',
			top: '60px',
			width: '288px',
			rowGap: '24px',
			left: '-288px',
			padding: '24px 16px',
			transition: 'all 0.2s',
			minHeight: 'calc(100vh - 60px)',
			backgroundColor: 'lightblue',
			zIndex: '2',
			borderTop: '1px solid gray',
			borderRight: '1px solid gray'
		},
		userDrawer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			position: 'fixed',
			top: '60px',
			width: '288px',
			right: '-288px',
			padding: '24px 16px',
			transition: 'all 0.2s',
			minHeight: 'calc(100vh - 60px)',
			backgroundColor: 'lightblue',
			zIndex: '2',
			borderTop: '1px solid gray',
			borderLeft: '1px solid gray'
		},
		userNav: {
			display: 'flex',
			flexDirection: 'column',
			rowGap: '24px',
		},
		categories: {
			height: '50px',
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			margin: '0',
			padding: '0',
			justifyContent: 'center',
			border: '1px solid black',
			cursor: 'pointer',
		},
		category: {
			height: '50px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			border: '1px solid black',
		},
		categorySelected: {
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'lightBlue',
			border: '1px solid black',
		},
		productCard: {
			border: '1px solid gray',
			borderRadius: '10px',
			padding: '10px',
			margin: '10px',
			display: 'grid',
			gridTemplateColumns: 'auto 1fr 1fr',
		},
		buyNowContainer: {
			display: 'grid',
			gridTemplateRows: '1fr 1fr 1fr',
			alignItems: 'center',
			justifyContent: 'center'
		},
		buyNowButton: {
			borderRadius: '20px',
			borderColor: 'darkgray',
			padding: '6px 6px'
		},
		walletItems: {
			paddingLeft: '20px',
			paddingRight: '20px',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
	}
}
