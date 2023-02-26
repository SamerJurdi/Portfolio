import { Formik } from 'formik'
import * as yup from 'yup'
import { handleResponse, showValidationMessage } from '../lib/common'
import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

export default function login() {

    function onSubmit(values) {
        console.log('Form Submitted')
        console.log(values)
    }

    const formValidationSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Required'),
        password: yup.string().required('Required'),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        onSubmit(values)
                        setSubmitting(false)
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                        <div style={userStyles.row}>
                            <div>
                                <label>E-mail</label>
                            </div>
                            <div>
                                <input style={errors.email && touched.email ? userStyles.invalidInput : userStyles.input}
                                    name="email" type="email"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.email} placeholder="example@mail.com" />
                                {showValidationMessage(errors.email, touched.email)}
                            </div>
                        </div>

                        <div style={userStyles.row}>
                            <div>
                                <label>Password</label>
                            </div>
                            <div>
                                <input style={errors.password && touched.password ? userStyles.invalidInput : userStyles.input}
                                    name="password" type="password"
                                    onBlur={handleBlur} value={values.password}
                                    onChange={handleChange} />
                                {showValidationMessage(errors.password, touched.password)}
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Log In
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}