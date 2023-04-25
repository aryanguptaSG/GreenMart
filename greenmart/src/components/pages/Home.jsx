import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard';

//material ui imports
import { Container, Grid, TextField, Button } from "@material-ui/core";

//react icons imports
import { FaFilter } from "react-icons/fa";

//firebase imports
import { realDb } from "../../firebase/firebaseConfig";
import { ref, query, onValue, limitToFirst } from "firebase/database";

function Home() {
    const [itemList, setitemList] = useState([]);
    const [itemIdList, setitemIdList] = useState({})

    useEffect(() => {
        const path = query(ref(realDb, "shopItems/"), limitToFirst(50));
        onValue(path, (snapshot) => {
            let temp = []
            let temp1 = [];
            for (let x in snapshot.val()) {
                temp1.push(x);
                temp.push(snapshot.val()[x]);
            }
            setitemList(temp);
            setitemIdList(temp1);
        })
    }, [])


    return (
        <div style={{ paddingTop: "100px" }}>
            <Container fixed>
                <Grid container spacing={2}>
                    <Grid item lg={10} md={10} sm={10} xs={8} >
                        <TextField style={{ width: "50%" }} variant="standard" color="primary" /> <Button variant="outlined" color="primary">Search</Button>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2} >
                        <Button
                            endIcon={<FaFilter />}
                            variant="outlined"
                        >Filter</Button>
                    </Grid>
                </Grid>
            </Container>

            <div className='gridItem' style={{ minHeight: "70vh" }}>
                {itemList.length === 0 ? <h5>No Items To Show</h5> :
                    <>
                        {itemList.map((item, id) => {
                            return <ItemCard item={item} key={id} id={itemIdList[id]} />
                        })}
                    </>}
            </div>




        </div>
    )
}

export default Home
