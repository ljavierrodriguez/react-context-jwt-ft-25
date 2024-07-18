import React, { useContext, useState } from 'react'
import { Context } from '../store/AppContext'
import { toast } from 'react-toastify'

const Register = () => {

    const { actions } = useContext(Context)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [show, setShow] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target

        if (username === '') {
            form.username.classList.add('is-invalid')
        } else {
            form.username.classList.remove('is-invalid')
        }

        if (password === '') {
            form.password.classList.add('is-invalid')
        } else {
            form.password.classList.remove('is-invalid')
        }

        if (confirmPassword === '') {
            form.confirmPassword.classList.add('is-invalid')
        } else if (password !== confirmPassword) {
            form.confirmPassword.classList.add('is-invalid')
        } else {
            form.confirmPassword.classList.remove('is-invalid')
        }

        const datos = { name, username, password }

        const resp = await actions.signUp(datos)
        console.log(resp)
        if (resp.status === 'success') {
            toast.success(resp.message)
            setName('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form className="w-50 mx-auto py-4" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="email" className="form-control" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <small className="invalid-feedback">Is required!</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <div className="input-group">
                                <input type={!show ? "password" : "text"} className="form-control" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type='button' className="btn btn-warning btn-sm" onClick={() => setShow(!show)}><i className={"bi " + (show ? "bi-eye-slash" : "bi-eye")}></i></button>
                                <small className="invalid-feedback">Is required!</small>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                            <input type="password" className="form-control" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <small className="invalid-feedback">No match with password!</small>
                        </div>
                        <button className="btn btn-primary btn-sm w-100">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register