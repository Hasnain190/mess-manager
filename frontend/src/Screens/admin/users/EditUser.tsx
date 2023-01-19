import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { getUserDetails, updateUser } from '../../../actions/user_actions'
import { USER_UPDATE_RESET } from '../../../constants/user_constants'



export default function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('')
    const [phone, setPhone] = useState('')
    const [hostel, setHostel] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    // @ts-expect-error TS(2339): Property 'userDetails' does not exist on type 'Def... Remove this comment to see the full error message
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    // @ts-expect-error TS(2339): Property 'userUpdate' does not exist on type 'Defa... Remove this comment to see the full error message
    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/view-users')
        } else {

            if (!user.username || user.id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                setRoom(user.room)
                setPhone(user.phone)
                setHostel(user.hostel)


            }
        }


    }, [successUpdate, user, id, dispatch, navigate])

    const submitHandler = (e: any) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, username, email, hostel, room, phone, isAdmin }))
    }



    return (

        <>

            <Link to='/admin/view-users'>
                Go Back
            </Link>


            <div className='contianer'>

                <div className="row justify-content-md-center">

                    <div className="col-md-6 col-xs-12">



                        <h1>Edit User</h1>

                        {loadingUpdate && <Loader />}

                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                            : (

                                <form onSubmit={submitHandler}>


                                    < div className='form-group' controlId='name'>

                                        <label htmlFor='username'>Name</label>

                                        <input

                                            className='form-control'

                                            type='name'
                                            placeholder='Enter name'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        >
                                        </input>
                                    </div>


                                    <div className='form-group' controlId='email'>

                                        <label htmlFor='email'>Email Address</label>

                                        <input
                                            className='form-control'
                                            type='email'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>


                                    <div className='form-group' controlId='isadmin'>

                                        <label htmlFor='isadmin'>Is Admin</label>

                                        <input

                                            type='checkbox'
                                            // @ts-expect-error TS(2322): Type '{ children: never[]; type: "checkbox"; label... Remove this comment to see the full error message
                                            label='Is Admin'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >

                                        </input>


                                    </div>

                                    {/* for phone */}

                                    <div className='form-group' controlId='phone'>

                                        <label htmlFor='phone'>Phone</label>

                                        <input

                                            className='form-control'
                                            type='phone'
                                            placeholder='Enter phone'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    {/* for hostel */}

                                    <div className='form-group' controlId='hostel'>

                                        <label htmlFor='hostel'>Hostel</label>

                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter hostel'
                                            value={hostel}
                                            onChange={(e) => setHostel(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    {/* for room */}

                                    <div className='form-group' controlId='room'>

                                        <label htmlFor='room'>Room</label>

                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter room'
                                            value={room}
                                            onChange={(e) => setRoom(e.target.value)}
                                        >
                                        </input>
                                    </div>


                                    <button type='submit' variant='primary'>
                                        Update
                                    </button>

                                </form>)
                        }
                    </div>
                </div>
            </div >
        </>

    )
}
