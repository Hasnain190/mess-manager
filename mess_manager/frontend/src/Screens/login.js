import React, { useState, useEffect } from "react";
import './login.css'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/user_actions'

import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo ) {
            navigate(redirect)
        }
      }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}


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




                    {/* new customer */}
                    <p className="lead mt-4">
                        New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
            </p>
                </div>
            </div>
        </div>

    </div>



       
    )
}

export default Login
