import React, { useState, useEffect } from 'react'


//material ui imports
import { Container, Grid, Button } from "@material-ui/core";
import Rating from '@mui/material/Rating';

//bootstrap imports
import { Card, Image } from "react-bootstrap";


//react-router imports;
import { useParams, Link } from "react-router-dom";

//redux imports
import { useSelector } from "react-redux";

//redux imports 
// import { useDispatch } from "react-redux";
// import { additem } from "../../redux-store/actions/actions";

//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, get, set } from "firebase/database";

function ItemDetail() {
    const user = useSelector((store) => store.userinfo);


    const [itemCount, setitemCount] = useState(1);
    const [item, setitem] = useState(null);
    const { id } = useParams();
    // const dispatch = useDispatch();

    useEffect(() => {
        const path = ref(realDb, "/shopItems/" + id);
        get(path).then(res => {
            setitem(res.val());
        }).catch(err => {
            alert(err);
        })
    }, [id])

    const addToCart = () => {
        let name = user.user.email.split("@")[0];
        const path = ref(realDb, 'users/' + name + "/Cart/" + id);
        const data = {
            ItemId: id,
            Count: itemCount
        }
        set(path, data);
        alert("Added To Cart !");
    }

    return (
        <>
            {item && <div style={{ paddingTop: "100px" }}>
                <h1 style={{ textAlign: "center" }}>Item Details</h1>
                <Container fixed>
                    <Grid container spacing={2}>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <Image src={item.image} width="100%" />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
                                <Card style={{ width: "100%" }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <h2>{item.Title}</h2>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">&#8377;{item.Price}/-</Card.Subtitle>
                                        <Rating size="small" name="read-only" value={2.5} readOnly />
                                        <Card.Text>
                                            {item.Desc}
                                        </Card.Text>
                                        <Card.Text>
                                            Seller :-  {item.Seller}
                                        </Card.Text>
                                        <div>
                                            <Button
                                                onClick={() => {
                                                    if (itemCount > 1) {
                                                        setitemCount(itemCount - 1);
                                                    }
                                                }}
                                                color="primary">-</Button>
                                            <span>{itemCount}</span>
                                            <Button
                                                onClick={() => {
                                                    setitemCount(itemCount + 1);
                                                }}
                                                color="primary">+</Button>
                                        </div>
                                        <Button
                                            onClick={addToCart}
                                            variant="outlined"
                                            color="primary"
                                        >Add To Cart</Button>
                                        <br /><br />
                                        <Button
                                            component={Link}
                                            to={`/payment/${id}`}
                                            variant="contained"
                                            color="primary"
                                        >Buy Now</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>}
        </>
    )
}

export default ItemDetail
