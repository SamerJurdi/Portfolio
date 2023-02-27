import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as yup from 'yup'
import { handleResponse, showValidationMessage } from '../lib/common'
import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

export default function login() {
    let router = useRouter()

    function onSubmit(values) {
        const objectWithData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        }
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData),
        }).then(async response => handleResponse(await response.json(), router))
    }

    const formValidationSchema = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        email: yup.string().email('Invalid email address').required('Required'),
        password: yup.string().required('Required'),
        passConfirmation: yup.string().label('confirm password').required('Required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passConfirmation: '',
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
                    validateForm,
                }) => (
                    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                        <div style={userStyles.row}>
                            <div>
                                <label>First Name</label>
                            </div>
                            <div>
                                <input style={errors.firstName && touched.firstName ? userStyles.invalidInput : userStyles.input}
                                    name="firstName" type="text"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.firstName} />
                                {showValidationMessage(errors.firstName, touched.firstName)}
                            </div>
                        </div>

                        <div style={userStyles.row}>
                            <div>
                                <label>Last Name</label>
                            </div>
                            <div>
                                <input style={errors.lastName && touched.lastName ? userStyles.invalidInput : userStyles.input}
                                    name="lastName" type="text"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.lastName} />
                                {showValidationMessage(errors.lastName, touched.lastName)}
                            </div>
                        </div>

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

                        <div style={userStyles.row}>
                            <div>
                                <label>Confirm Password</label>
                            </div>
                            <div>
                                <input style={errors.passConfirmation && touched.passConfirmation ? userStyles.invalidInput : userStyles.input}
                                    name="passConfirmation" type="password"
                                    onBlur={handleBlur} value={values.passConfirmation}
                                    onChange={handleChange} />
                                {showValidationMessage(errors.passConfirmation, touched.passConfirmation)}
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} style={userStyles.button}>
                            Sign Up
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}