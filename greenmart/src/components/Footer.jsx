import React from 'react'

import { Card } from "react-bootstrap"

function Footer() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Card>
                <Card.Body>
                    <h6>This site is designed & developed by Mr. Aryan Gupta.</h6>
                    <h6>&copy; Copyright 2022 GreenMart. All Rights Reserved.</h6>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Footer
