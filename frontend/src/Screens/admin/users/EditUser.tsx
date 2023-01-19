import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from '../../../components/Loader'
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Link to='/admin/view-users'>
                Go Back
            </Link>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className='contianer'>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="row justify-content-md-center">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="col-md-6 col-xs-12">


                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <h1>Edit User</h1>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {loadingUpdate && <Loader />}
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                            : (
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <form onSubmit={submitHandler}>

                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    < div className='form-group' controlId='name'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='username'>Name</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <input

                                            className='form-control'

                                            type='name'
                                            placeholder='Enter name'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div className='form-group' controlId='email'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='email'>Email Address</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <input
                                            className='form-control'
                                            type='email'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div className='form-group' controlId='isadmin'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='isadmin'>Is Admin</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div className='form-group' controlId='phone'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='phone'>Phone</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div className='form-group' controlId='hostel'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='hostel'>Hostel</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <div className='form-group' controlId='room'>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <label htmlFor='room'>Room</label>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <input
                                            className='form-control'
                                            type='text'
                                            placeholder='Enter room'
                                            value={room}
                                            onChange={(e) => setRoom(e.target.value)}
                                        >
                                        </input>
                                    </div>

                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
