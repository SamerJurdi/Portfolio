export default function getUserStyles(props) {
    const direction = props?.direction ? props.direction : 'ltr'

    return {
        row: {
            display: 'grid',
            gap: '1em',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            paddingBottom: '5px',
            direction,
        },
        input: {
            borderRadius: '10px',
            paddingLeft: '5px',
            paddingRight: '5px',
            maxWidth: '150px',
        },
        invalidInput: {
            borderRadius: '10px',
            borderColor: '#ec1c24',
            paddingLeft: '5px',
            paddingRight: '5px',
            maxWidth: '150px',
        },
        invalidText: {
            color: '#ec1c24',
        },
        tabButton: {
            flex: 1,
            padding: '1%',
            border: 'none',
            borderBottom: '1px solid gray',
            background: 'none',
        },
        tabButtonSelectedR: {
            background: 'linear-gradient(45deg, lightBlue, transparent)',
        },
        tabButtonSelectedL: {
            background: 'linear-gradient(-45deg, lightBlue, transparent)',
        },
        button: {
            borderRadius: '25px',
            border: '1px solid gray',
            background: 'lightcyan',
            width: '120px',
            padding: '4px',
        }
    }
}