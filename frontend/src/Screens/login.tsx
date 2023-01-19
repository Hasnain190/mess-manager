import React, { useState, useEffect } from "react";
import './login.css'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from "react-router-dom";

// @ts-expect-error TS(6142): Module '../components/Loader' was resolved to 'F:/... Remove this comment to see the full error message
import Loader from '../components/Loader'
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'F:... Remove this comment to see the full error message
import Message from '../components/Message'
import { login } from '../actions/user_actions'



function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/dashboard'

    // @ts-expect-error TS(2339): Property 'userLogin' does not exist on type 'Defau... Remove this comment to see the full error message
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo !== []) {
            navigate(redirect)

        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e: any) => {
        e.preventDefault()
        dispatch(login(username, password))
    }


    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="container">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="row">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="col-md-6 mx-auto">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="card card-body">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <h3 className="text-center mb-4">
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <i className="fas fa-user-plus"></i> Login</h3>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {error && <Message variant='danger'>{error}</Message>}
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {loading && <Loader />}

                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <form onSubmit={submitHandler}>

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="username">User Name</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}


                                />
                            </div>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="password">Password</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}


                                />
                            </div>

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
