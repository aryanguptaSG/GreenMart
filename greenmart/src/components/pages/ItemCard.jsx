import React from 'react';

//bootstrap imports
import { Card, Image } from "react-bootstrap";


//material ui imports
import Rating from '@mui/material/Rating';

//react-router imports;
import { Link } from "react-router-dom";




function ItemCard({ item, id }) {
    return (
        <div style={{ margin: "10px" }}>
            <Card style={{ width: '10rem' }}>
                <Link style={{ textDecoration: "none", color: "#000" }} to={`/product/${id}`}>
                    <Image src={item.image} width="100%" />
                    <Card.Body>
                        <Rating size="small" name="read-only" value={2.5} readOnly />
                        <Card.Title>{item.Title}</Card.Title>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    )
}

export default ItemCard
