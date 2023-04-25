import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard';

//react-router imports;
import { useParams } from "react-router-dom";

//redux imports
import { useSelector } from "react-redux";

//react-bootstrap imports 
import { Form, Container, Row, Col, Card } from "react-bootstrap"

//material ui imports 
import { Button, Grid } from "@material-ui/core";

//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, get, set, push } from "firebase/database";


function PaymentPage() {
    const user = useSelector((store) => store.userinfo);


    const [address, setaddress] = useState(null);
    const [ad1, setad1] = useState("");
    const [ad2, setad2] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState(null)
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [pinCode, setpinCode] = useState("");

    //item details
    const [item, setitem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const path = ref(realDb, "/shopItems/" + id);
        get(path).then(res => {
            setitem(res.val());
            console.log(res.val());
        }).catch(err => {
            alert(err);
        })
    }, [id])

    const placeOrder = () => {
        let name = user.user.email.split("@")[0];
        const path = ref(realDb, 'users/' + name + "/Orders/");
        const pushItem = push(path);
        const data = {
            ItemId: id,
            Details: address,
            Total_Money: parseInt(item.Price) + 10
        }
        set(pushItem, data);
        alert("Congratulations Your Order is Placed !");
        window.location.href = "/profile";
    }

    const addAddress = (e) => {
        e.preventDefault();
        setad1(ad1.trim());
        setad2(ad2.trim());
        setcity(city.trim());
        setPhoneNumber(PhoneNumber.trim());
        setpinCode(pinCode.trim());
        setstate(state.trim());
        if (!ad1 || !PhoneNumber || !city || !state || !pinCode) {
            alert("please fill all details.");
            return;
        }
        const Address = {
            Address1: ad1,
            Address2: ad2,
            PhoneNumber: PhoneNumber,
            City: city,
            State: state,
            PinCode: pinCode
        }
        setaddress(Address);
    }

    return (
        <div style={{ paddingTop: "100px" }}>
            <h3 style={{ textAlign: "center" }}>Payment Page</h3>
            <Container>
                <Form onSubmit={addAddress}>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={ad1}
                            onChange={(e) => {
                                setad1(e.target.value);
                            }}
                            placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            value={ad2}
                            onChange={(e) => {
                                setad2(e.target.value);
                            }}
                            placeholder="Apartment, studio, or floor" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            value={PhoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={city}
                                onChange={(e) => {
                                    setcity(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                value={state}
                                onChange={(e) => {
                                    setstate(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip / Pin Code</Form.Label>
                            <Form.Control
                                value={pinCode}
                                onChange={(e) => {
                                    setpinCode(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Row>

                    <Button color="primary" variant="contained" type="submit">
                        Add Address
                    </Button>
                </Form>
            </Container>

            {address &&
                <Container style={{ paddingTop: "100px" }}>
                    <Card>
                        <Card.Header>
                            <h3>Address :- {address.Address1}</h3>
                            {address.Address2 && <h4>Address2 :- {address.Address2}</h4>}
                        </Card.Header>
                        <Card.Body>
                            <h5>Phone Number :- {address.PhoneNuber}</h5>
                            <h5>City:- {address.City} , State:-{address.State}</h5>
                            <h5>Pin / Zip Code :- {address.PinCode}</h5>
                            <Grid container>
                                <Grid item>
                                    <ItemCard as={Col} lg={6} item={item} id={id} />
                                </Grid>
                                <Grid className='p-5' item>
                                    <h5>Price :- &#8377;{item.Price}/-</h5>
                                    <h5>GST :- &#8377;{10}/-</h5>
                                    <h4>Total :- &#8377;{parseInt(item.Price) + 10}/-</h4>

                                    <Button
                                        onClick={placeOrder}
                                        color="secondary"
                                        variant="contained"
                                    >Place Your Order</Button>
                                </Grid>
                            </Grid>
                        </Card.Body>
                    </Card>
                </Container>
            }

        </div>
    )
}

export default PaymentPage;
