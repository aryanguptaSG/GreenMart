import React, { useState } from 'react'
import signinimg from "../../images/signin.jpg";

//material ui imports 
import { Grid, Button, CircularProgress } from "@material-ui/core";

//bootstrap
import { Image, Form } from "react-bootstrap";

//redux imports 
import { useDispatch } from "react-redux";
import { signIn, profileCreated } from "../../redux-store/actions/actions";

//firebase imports
import { auth, realDb } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onValue } from "firebase/database";



function SignIn() {
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [isprogress, setisprogress] = useState(false);
    const dispatch = useDispatch();
    const userSignin = (e) => {
        e.preventDefault();
        setemail(email.trim());
        setpass(pass.trim());
        if (email) {
            if (pass) {
                setisprogress(true);
                signInWithEmailAndPassword(auth, email, pass).then(user => {
                    user = auth.currentUser;
                    dispatch(signIn(user));
                    let name = email.split("@")[0];
                    let path = ref(realDb, 'users/' + name)
                    onValue(path, (snapshot) => {
                        const data = snapshot.val();
                        dispatch(profileCreated(data))
                    });
                    setisprogress(false);
                }).catch(err => {
                    alert(err);
                    setisprogress(false);
                })
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
                    <Image fluid src={signinimg} />
                </Grid>
                <Grid className='signupform' item lg={6} md={6} sm={12} xs={12}>
                    <Form onSubmit={userSignin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={email} onChange={(e) => {
                                    setemail(e.target.value);
                                }}
                                type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={pass} onChange={(e) => {
                                    setpass(e.target.value);
                                }}
                                type="password" placeholder="Password" />
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

export default SignIn;
