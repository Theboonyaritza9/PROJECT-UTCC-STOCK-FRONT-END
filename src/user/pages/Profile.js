import React from 'react'
import { Container, Paper} from "@material-ui/core"

    const data = {
        id: "cacd5252",
        email: "boonyarit@hotmail.com",
        name: "Boonyarit",
        password: "1234",
        status: "Admin",
        image: "https://i.pinimg.com/564x/95/c8/d2/95c8d2413663f98c43fbd51aa3791bdb.jpg"
    }

export default function Profile() {



    return (
        <div>
            <Container maxWidth="sm">
                <h1>โปรไฟล์</h1>
                <Paper style={{
                    padding: "10px",
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    boxSizing: "border-box"}}>
                    <img style={{
                        width: "200px",
                        borderRadius: "5px"}} 
                        src={data.image} alt="jpg"/>
                    <h4>{data.name}</h4>
                    <h4 style={{margin: "0px"}}>สถานะ: {data.status}</h4>
                </Paper>
            </Container>
        </div>
    )
}
