export default function getStyles(props) {
	const direction = props?.direction ? props.direction : 'ltr'

	return {
		container: {
			paddingLeft: '10%',
			paddingRight: '10%',
			paddingTop: '5%',
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
	}
}