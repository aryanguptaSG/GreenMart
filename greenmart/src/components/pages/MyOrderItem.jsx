import React from 'react'


//material ui imports
import { Grid, Button } from "@material-ui/core";
import Rating from '@mui/material/Rating';

//react-bootstrap imports 
import { Card, Image } from "react-bootstrap";

//redux imports 
import { useSelector } from "react-redux";

//react-router imports;
import { useNavigate } from "react-router-dom";


//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, remove } from "firebase/database";

function MyOrderItem({ item, myitem, id }) {
    const user = useSelector((store) => store.userinfo);
    const navigate = useNavigate();

    const cancleMyOrder = () => {
        let name = user.user.email.split("@")[0];
        const path = ref(realDb, 'users/' + name + "/Orders/" + id);
        remove(path).then(() => {
            alert("Order Cancled !");
        }).catch(err => {
            alert(err)
        })
    }

    const openDetails = () => {
        navigate('/details',
            { state: { id, item, myitem } });
    }
    return (
        <Card className='m-3'>
            <Grid container>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <Image src={item.image} width="100%" />
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={8}>
                    <Card.Body>
                        <Rating size="small" name="read-only" value={2.5} readOnly />
                        <Card.Title>{item.Title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">&#8377;{item.Price}/-</Card.Subtitle>
                        <Card.Text> {item.Desc} </Card.Text>
                        <Card.Text>Seller :- {item.Seller} </Card.Text>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                onClick={openDetails}
                                color="primary" variant="contained">Details</Button>
                            <Button
                                onClick={cancleMyOrder}
                                color="secondary" variant="contained">Cancle Order</Button>
                        </div>
                    </Card.Body>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MyOrderItem
