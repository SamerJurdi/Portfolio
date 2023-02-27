import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

function handleResponse(response, router) {
    response.message && alert(response.message)
    response.redirect && router.push(response.redirect)
}
function showValidationMessage(error, touched) {
    return error && touched && <div style={userStyles.invalidText}>{error}</div>
}

export { handleResponse, showValidationMessage }
