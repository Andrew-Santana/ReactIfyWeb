import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/contextProvider";

export default function SignUp() {

    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const nameRef = useRef();
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmationRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setToken(data.token)
                setUser(data.user)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    console.error(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}> {errors[key][0]}</p>
                        ))}
                        </div>}
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={confirmationRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login" >Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}