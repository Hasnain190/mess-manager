import React, { useState, useEffect } from "react";
import './login.css'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/user_actions'



function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/dashboard'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {

        // if (userInfo && userInfo !== []) {
        if (userInfo) {
            navigate(redirect)

        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e: any) => {
        e.preventDefault()
        dispatch(login(username, password))
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card card-body">
                        <h3 className="text-center mb-4">
                            <i className="fas fa-user-plus"></i> Login</h3>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}

                        <form onSubmit={submitHandler}>

                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}


                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}


                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                login</button>
                        </form>






                    </div>
                </div>
            </div>

        </div>




    )
}

export default Login
