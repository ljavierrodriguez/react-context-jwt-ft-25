import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/AppContext'
import { toast } from 'react-toastify'

const Profile = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        if (store.access_token !== null) {
            actions.getProfile()
        }
    }, [store.access_token])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, username, biography, github, linkedin } = e.target;

        const datos = {
            name: name.value,
            username: username.value,
            biography: biography.value,
            github: github.value,
            linkedin: linkedin.value
        }

        const resp = await actions.updateProfile(datos)
        if (resp.status === 'success') {
            toast.success(resp.message)
        } else {
            toast.error(resp.message)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3>Profile</h3>
                    <form className="w-50 mx-auto py-4" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id='name' defaultValue={store?.profile?.name} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="email" className="form-control" id='username' defaultValue={store?.profile?.username} readOnly disabled />
                            <small className="invalid-feedback">Is required!</small>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="biography" className="form-label">Biography</label>
                            <textarea id="biography" className="form-control" rows={5} defaultValue={store?.profile?.biography}></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="github" className="form-label">Github:</label>
                            <input type="text" className="form-control" id='github' defaultValue={store?.profile?.github} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="linkedin" className="form-label">Linkedin:</label>
                            <input type="text" className="form-control" id='linkedin' defaultValue={store?.profile?.linkedin} />
                        </div>
                        <button className="btn btn-warning btn-sm w-100">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile