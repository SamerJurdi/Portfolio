import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as yup from 'yup'
import { handleResponse, showValidationMessage } from '../lib/common'
import getUserStyles from '../styles/user.module.css'

const userStyles = getUserStyles()

export default function login() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(values) {
        setIsLoading(true)
        const objectWithData = {
            email: values.email,
            password: values.password,
        }
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectWithData),
        }).then(async response => {
            setIsLoading(false)
            handleResponse(await response.json(), router)
        })
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
                    onSubmit(values)
                    setSubmitting(false)
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

                        <button type="submit" disabled={isSubmitting} style={userStyles.button}>
                            {isLoading ? 'Loading...' : 'Log In'}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}