import React, { useState, useEffect } from 'react'
import MyOrderItem from './MyOrderItem';

//material ui imports
import { Grid, Button, TextField } from "@material-ui/core";


//react-bootstrap imports 
import { Card, Alert, Container } from "react-bootstrap"

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../redux-store/actions/actions";

//firebase imports
import { auth, realDb } from "../../firebase/firebaseConfig";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { ref, onValue, get } from "firebase/database";


//react-router imports;
import { Link } from "react-router-dom";




function Profile() {
    const [isedit, setisedit] = useState(false);
    const [editSavebtn, seteditSavebtn] = useState("Edit");
    const [username, setusername] = useState(null);
    const user = useSelector((store) => store.userinfo);
    const dispatch = useDispatch();

    // my orders details
    const [orderItemsinfo, setorderItemsinfo] = useState(null);
    const [orderItems, setorderItems] = useState(null);
    const [orderItemsId, setorderItemsId] = useState(null)


    useEffect(() => {
        setusername(user.user.displayName);
        const getdata = async () => {
            let name = user.user.email.split("@")[0];
            const path = ref(realDb, 'users/' + name + "/Orders/");
            onValue(path, async (snapshot) => {
                // setorderItems(null);
                // setorderItemsId(null);
                // setorderItemsinfo(null);
                let temp = [];
                let temp1 = [];
                let temp2 = [];
                for (let x in snapshot.val()) {
                    temp1.push(x);
                    temp2.push(snapshot.val()[x]);
                    let itempath = ref(realDb, "shopItems/" + snapshot.val()[x].ItemId);
                    let ans = await get(itempath);
                    temp.push(ans.toJSON());
                }
                setorderItems(temp);
                setorderItemsId(temp1);
                setorderItemsinfo(temp2);
            })
        }
        getdata();
    }, [user.user.displayName, user.user.email])

    const handleEditBtn = () => {
        if (editSavebtn === "Edit") {
            seteditSavebtn("Save");
        }
        else {
            seteditSavebtn("Edit");
            if (username.trim().length > 0) {
                updateProfile(auth.currentUser, {
                    displayName: username.trim()
                }).then(() => {
                    let user = auth.currentUser;
                    dispatch(signIn(user));
                }).catch((err) => {
                    alert(err);
                })
            }
        }
        setisedit(!isedit);
    }

    const sendVerificationLink = () => {
        sendEmailVerification(auth.currentUser).then(() => {
            alert("Verification link has been sent . Please check your email !")
        })
    }

    return (
        <div style={{ paddingTop: "100px" }}>
            <Container>
                <Card>
                    {/* Header starts */}
                    <Card.Header>
                        <Grid container>
                            <Grid lg={10} md={10} sm={10} xs={10} item >
                                <h1>{username != null ? username : "Please Edit Your Name"}</h1>
                            </Grid>
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <Button
                                    onClick={handleEditBtn}
                                    color="primary" variant="contained">{editSavebtn}</Button>
                                {isedit && <span><TextField label="Name" value={username}
                                    onChange={(e) => {
                                        setusername(e.target.value)
                                    }} /></span>}
                            </Grid>
                        </Grid>
                    </Card.Header>

                    {/* Header Body starts */}
                    <Card.Body>
                        <Card.Title>{user.user.email}</Card.Title>
                        {auth.currentUser && !auth.currentUser.emailVerified && <>
                            <Alert variant='danger'>
                                Email is not verified.
                                <Button
                                    onClick={sendVerificationLink}
                                    className='mx-3' color="secondary" variant="contained">Send Verification Link</Button>
                            </Alert>
                        </>}

                        <Button component={Link} to="/myshop" color="primary" variant="contained">My Shop</Button>
                    </Card.Body>
                </Card>


                {/* My orders starts */}
                <div style={{ paddingTop: "100px" }}>
                    <h3>My Orders</h3>

                    {orderItems && orderItemsId && orderItemsinfo && <>
                        {orderItems.length === 0 ? <h4>No Orders</h4> :
                            <>{
                                orderItems.map((item, id) => {
                                    return <MyOrderItem key={id} item={item} myitem={orderItemsinfo[id]} id={orderItemsId[id]} />
                                })
                            }</>
                        }
                    </>}
                </div>

            </Container>
        </div>
    )
}

export default Profile
