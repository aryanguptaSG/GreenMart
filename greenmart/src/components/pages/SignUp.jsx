import React, { useState } from 'react'
import signupimg from "../../images/register.jpg";

//material ui imports 
import { Grid, Button, CircularProgress } from "@material-ui/core";

//bootstrap
import { Image, Form } from "react-bootstrap";

//redux imports 
import { useDispatch } from "react-redux";
import { signIn, profileCreated } from "../../redux-store/actions/actions";

//firebase imports
import { auth, realDb } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";

function SignUp() {
    const [email, setemail] = useState("");
    const [pass1, setpass1] = useState("");
    const [pass2, setpass2] = useState("");
    const [isprogress, setisprogress] = useState(false);
    const dispatch = useDispatch();
    const userSignup = (e) => {
        setemail(email.trim());
        setpass1(pass1.trim());
        setpass2(pass2.trim());
        e.preventDefault();
        if (email) {
            if (pass1) {
                if (pass2) {
                    if (pass1 === pass2) {
                        setisprogress(true);
                        createUserWithEmailAndPassword(auth, email, pass2).then(newuser => {
                            let user = auth.currentUser;
                            dispatch(signIn(user));
                            let profile = {
                                email: email
                            }
                            let name = email.split("@")[0];
                            let path = ref(realDb, 'users/' + name)
                            set(path, profile);
                            dispatch(profileCreated(profile));
                            setisprogress(false);
                        }).catch(err => {
                            alert(err);
                            setisprogress(false);
                        })
                    }
                    else {
                        alert("password dosen't match");
                    }
                }
                else {
                    alert("please confirm password.");
                }
            }
            else {
                alert("please fill password.");
            }
        }
        else {
            alert("please fill email.");
        }
    }
    return (
        <div style={{ paddingTop: "80px" }}>
            <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Image fluid src={signupimg} />
                </Grid>
                <Grid className='signupform' item lg={6} md={6} sm={12} xs={12}>
                    <Form onSubmit={userSignup}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={(e) => {
                                setemail(e.target.value);
                            }} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={pass1} onChange={(e) => {
                                    setpass1(e.target.value);
                                }}
                                type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                value={pass2} onChange={(e) => {
                                    setpass2(e.target.value);
                                }}
                                type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>{isprogress ? <span style={{ margin: "10px", position: "relative", top: "15px" }}><CircularProgress value={50} /></span> : null}
                    </Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp;
