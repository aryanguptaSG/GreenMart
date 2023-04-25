import React from 'react'


//material ui imports
import { Container, Grid } from "@material-ui/core";
import Rating from '@mui/material/Rating';

//bootstrap imports
import { Card, Image } from "react-bootstrap";


//react-router imports;
import { useLocation } from "react-router-dom";


function MyOrderDetail() {
    const { state } = useLocation();

    const { item, myitem } = state;
    console.log(myitem);

    return (
        <>
            {item && <div style={{ paddingTop: "100px" }}>
                <h1 style={{ textAlign: "center" }}>Order Details</h1>
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
                                        <Card.Subtitle className="mb-2 text-muted">&#8377;Amount :- {myitem.Total_Money}/- (pay on delivery)</Card.Subtitle>
                                        <Rating size="small" name="read-only" value={2.5} readOnly />
                                        <Card.Text>
                                            Seller :  {item.Seller}
                                        </Card.Text>
                                        <Card.Text>
                                            Phone Number:
                                            {"  " + myitem.Details.PhoneNumber}
                                        </Card.Text>
                                        Address:
                                        <Card.Text>
                                            {myitem.Details.Address1}
                                        </Card.Text>
                                        {myitem.Details.Address2 && <Card.Text>
                                            {myitem.Details.Address1}
                                        </Card.Text>
                                        }
                                        <Card.Text>{myitem.Details.City} , {myitem.Details.State} ,Pin/Zip Code : {myitem.Details.PinCode}</Card.Text>

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

export default MyOrderDetail
