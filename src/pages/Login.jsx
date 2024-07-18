import React, { useContext, useState } from 'react'
import { Context } from '../store/AppContext'
import { toast } from 'react-toastify'

const Login = () => {

    const { actions } = useContext(Context)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


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

        const datos = { username, password }

        const resp = await actions.signIn(datos)
        console.log(resp)
        if (resp.status === 'success') {
            toast.success(resp.message)
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <form className="w-50 mx-auto py-4" onSubmit={handleSubmit}>
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
                        <button className="btn btn-primary btn-sm w-100">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login