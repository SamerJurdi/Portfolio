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
		card: {
			color: 'inherit',
			textDecoration: 'inherit',
			borderRadius: '20px'
		},
	}
}