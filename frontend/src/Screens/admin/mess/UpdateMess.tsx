import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { getMessMenu, updateMessMenu } from "../../../actions/mess_actions";

// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
import { useSelector, useDispatch } from "react-redux";

import "./ViewMess.css";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <section id="tabs" class="project-tab">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div class="container">





                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div class="col-md-12">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div class="tab-content" id="nav-tabContent">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div
                            // @ts-expect-error TS(2322): Type '{ children: Element; class: string; id: stri... Remove this comment to see the full error message
                            class="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                                : (
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <form onSubmit={(e) => submitHandler(e)}>

                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <table class="table" cellspacing="0">
                                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                            <thead>
                                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                <tr>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <th>Day</th>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <th>First Time</th>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <th>Second Time</th>
                                                </tr>
                                            </thead>

                                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                            <tbody>
                                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                {menu.map((menu: any) => <tr key={menu.id}>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <td >
                                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                        <a href="#">{menu.day}</a>
                                                    </td>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <td className="form-group">
                                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                        <input type="text" name="firstTime" className="form-control" placeholder={menu.first_time} value={menuFirst} onChange={(e) => handleChange(e)} />

                                                    </td>
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <td className="form-group">
                                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                        <input type="text" name="secondTime" className="form-control" placeholder={menu.second_time} value={menuSecond} onChange={(e) => handleChange(e)} />

                                                    </td>
                                                </tr>)}


                                            </tbody>
                                        </table>
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <div class="row">
                                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                            <div class="col-md-12">
                                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                <button class="btn btn-primary" type="submit">Save</button>
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
