import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { getUserDetails, updateUser } from '../../../features/user/user_actions_creators'
import { detailsReset } from '../../../features/user/user_slice'


export default function EditUser() {


    const { id } = useParams()
    const navigate = useNavigate()

    const userDetails = useAppSelector(state => state.userDetails)
    const { error, loading, user, success } = userDetails

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [room, setRoom] = useState(user.room)
    const [phone, setPhone] = useState(user.phone)
    const [hostel, setHostel] = useState(user.hostel)
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)

    const dispatch = useAppDispatch()


    const userUpdate = useAppSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {




        if (!user?.username || user?.id !== Number(id)) {
            dispatch(getUserDetails(id))
        }
        else {
            setUsername(user?.username)
            setEmail(user?.email)
            setIsAdmin(user?.isAdmin)
            setRoom(user?.room)
            setPhone(user?.phone)
            setHostel(user?.hostel)

        }




    }, [id, user, success])


    useEffect(() => {

        if (successUpdate) {
            navigate("/admin/view-users/")
        }

    }, [successUpdate])

    const submitHandler = (e: any) => {
        e.preventDefault()
        dispatch(updateUser({ id: id, username, email, hostel, room, phone, isAdmin }))
        dispatch(detailsReset())




    }



    return (

        <>

            <Link to='/admin/view-users'>
                Go Back
            </Link>


            <div className='container'>

                <div className="row justify-content-md-center">

                    <div className="col-md-6 col-xs-12">



                        <h1>Edit User</h1>

                        {loadingUpdate ? <Loader /> :

                            errorUpdate ? <Message variant='danger'>{errorUpdate}</Message> :
                                successUpdate ? <Message variant='success'>{'Updated'}</Message> :
                                    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                                        : (

                                            <form onSubmit={submitHandler}>

                                                {/* for name */}
                                                < div className='form-group' >

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

                                                {/* for email */}
                                                <div className='form-group'>

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
                                                {/* isAdmin */}

                                                <div className='form-group'>

                                                    <label htmlFor='isAdmin'>Is Admin</label>

                                                    <input

                                                        type='checkbox'

                                                        checked={isAdmin}
                                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                                    >

                                                    </input>


                                                </div>

                                                {/* for phone */}

                                                <div className='form-group' >

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

                                                <div className='form-group'>

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

                                                <div className='form-group' >

                                                    <label htmlFor='room'>Room</label>

                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='Enter room'
                                                        value={room}
                                                        onChange={(e) => setRoom(Number(e.target.value))}
                                                    >
                                                    </input>
                                                </div>


                                                <button type='submit' >
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
