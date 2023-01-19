import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { getMessMenu, updateMessMenu } from "../../../actions/mess_actions";

import Message from "../../../components/Message";
import { useSelector, useDispatch } from "react-redux";

import "./ViewMess.css";
import Loader from "../../../components/Loader";



function UpdateMess() {

    const dispatch = useDispatch()
    const { day } = useParams()

    const [menuFirst, setMenuFirst] = useState()
    const [menuSecond, setMenuSecond] = useState()
    useEffect(() => {
        dispatch(getMessMenu());
    }, [dispatch, useSelector]);

    // @ts-expect-error TS(2339): Property 'messMenu' does not exist on type 'Defaul... Remove this comment to see the full error message
    const { messMenu, loading, error } = useSelector((state) => state.messMenu);
    let menu = messMenu.filter((item: any) => item?.day === day)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "firstTime") {
            setMenuFirst(value)
        } else if (name === "secondTime") {
            setMenuSecond(value)
        }

        console.log({ name, value })
    }

    const navigate = useNavigate()
    const submitHandler = async (e: any) => {
        e.preventDefault();
        await dispatch(updateMessMenu(day, {
            day: day,
            first_time: menuFirst,
            second_time: menuSecond
        }))

        navigate(-1)
        alert("Menu Updated")




    }

    return (

        <section id="tabs" className="project-tab">

            <div className="container">






                <div className="col-md-12">

                    <div className="tab-content" id="nav-tabContent">

                        <div
                            // @ts-expect-error TS(2322): Type '{ children: Element; class: string; id: stri... Remove this comment to see the full error message
                            class="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >

                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                                : (

                                    <form onSubmit={(e) => submitHandler(e)}>


                                        <table className="table" cellSpacing="0">

                                            <thead>

                                                <tr>

                                                    <th>Day</th>

                                                    <th>First Time</th>

                                                    <th>Second Time</th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                {menu.map((menu: any) => <tr key={menu.id}>

                                                    <td >

                                                        <a href="#">{menu.day}</a>
                                                    </td>

                                                    <td className="form-group">

                                                        <input type="text" name="firstTime" className="form-control" placeholder={menu.first_time} value={menuFirst} onChange={(e) => handleChange(e)} />

                                                    </td>

                                                    <td className="form-group">

                                                        <input type="text" name="secondTime" className="form-control" placeholder={menu.second_time} value={menuSecond} onChange={(e) => handleChange(e)} />

                                                    </td>
                                                </tr>)}


                                            </tbody>
                                        </table>

                                        <div className="row">

                                            <div className="col-md-12">

                                                <button className="btn btn-primary" type="submit">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
}

export default UpdateMess;
