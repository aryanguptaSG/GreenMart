import React from 'react'

//react-bootstrap imports 
import { Card, Image } from "react-bootstrap";

//redux imports
import { useSelector } from "react-redux";

//material ui imports 
import { Button, Grid } from "@material-ui/core";
import Rating from '@mui/material/Rating';

//firebase imports
import { storage, realDb } from "../../firebase/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { ref as Dref, remove } from "firebase/database";

function ItemListCard({ item, id, myid }) {
    const user = useSelector((store) => store.userinfo);
    const handleRemove = () => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, `itemImages/${id}`)

        // Delete the file
        deleteObject(desertRef).then(() => {
            const dbref = Dref(realDb, "shopItems/" + id);

            remove(dbref).then(() => {

                let name = user.user.email.split("@")[0];
                const userdbref = Dref(realDb, 'users/' + name + "/shopItems/" + myid);

                remove(userdbref).then(() => {
                    alert("deleted ")

                }).catch((error) => {
                    alert(error)
                });
            }).catch((error) => {
                alert(error)
            });
        }).catch((error) => {
            alert(error)
        });
    }
    return (
        <Card key={id} className='m-3'>
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
                        <Card.Text>Seller:- {item.Seller} </Card.Text>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button color="primary" variant="contained">Edit</Button>

                            <Button
                                onClick={handleRemove}
                                color="secondary" variant="contained">Remove</Button>
                        </div>
                    </Card.Body>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ItemListCard
