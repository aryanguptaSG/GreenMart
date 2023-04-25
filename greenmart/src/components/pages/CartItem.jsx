import React from 'react'
import ItemCard from './ItemCard';

//material ui imports
import { Grid, Button } from "@material-ui/core";

//bootstrap imports
import { Card } from "react-bootstrap";

//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, remove } from "firebase/database";

//redux imports 
import { useSelector } from "react-redux";


function CartItem({ myitem, item, id }) {
    const user = useSelector((store) => store.userinfo);

    const handleRemove = () => {
        let name = user.user.email.split("@")[0];
        const path = ref(realDb, 'users/' + name + "/Cart/" + id);
        remove(path).then(() => {
            alert("Removed From Cart !");
        }).catch(err => {
            alert(err)
        })
    }
    return (
        <Card key={id}>
            <Card.Body>
                <Grid container spacing={5}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <ItemCard item={myitem} id={id} />
                    </Grid>
                    <Grid style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }} item lg={6} md={6} sm={6} xs={6}>
                        <h4>Count :- {item.Count}</h4>
                        <Button
                            onClick={handleRemove}
                            color="secondary"
                            variant="contained"
                        >Remove From Cart</Button>
                    </Grid>
                </Grid>
            </Card.Body>
        </Card>
    )
}

export default CartItem
