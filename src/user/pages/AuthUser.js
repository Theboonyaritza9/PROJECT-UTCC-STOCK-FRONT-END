import React, { useState } from 'react';
import { Card, CardContent, Avatar, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { users } from "../../Api";

// Icon
import DeleteIcon from '@material-ui/icons/Delete';

// CSS
import "./AuthUser.css"
import ModalSubmit from '../components/ModalSubmit';

const useStyles = makeStyles((theme) => ({
    image: {
        margin: "0 auto",
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    button: {
        margin: "0 5px"
    }
}));

function AuthUser() {

    const classes = useStyles();
    const [openPrompt, setOpenPrompt] = useState(false);
    const [userId, setUserId] = useState("")

    const handleOpenPrompt = (id) => {
        setUserId(id)
        setOpenPrompt(true)
    }

    const handleClosePrompt = () => {
        setOpenPrompt(false)
        setUserId("")
    }

    const handleSubmitPrompt = (e) => {
        e.preventDefault();
        setOpenPrompt(false)
        console.log(userId)
    }

    return (
        <div className="container-users">
            <h1>การจัดการเข้าถึงของผู้ใช้ทั้งหมด</h1>
            <h3>ผู้ใช้งานในระบบ</h3>
            <div className="user-in-system">
                {users.map((user, index) => {
                    if (user.status === "User") {
                        return (
                            <Card className="card-item" key={index} >
                                <CardContent>
                                    <Avatar className={classes.image} alt="" src={user.image} />
                                    <h3>{user.name}</h3>
                                    <p>สถานะ ผู้ใช้งาน</p>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleOpenPrompt(user.id)}
                                    >
                                        ลบออกจากระบบ
                                </Button>
                                </CardContent>
                            </Card>
                        )
                    }
                })}
            </div>

            <h3>รอการอนุมัติ</h3>
            <div className="user-in-system">
                {users.map((user, index) => {
                    if (user.status === "Waiting") {
                        return (
                            <Card className="card-item" key={index} >
                                <CardContent>
                                    <Avatar className={classes.image} alt="" src="/images/profile.png" />
                                    <h3>{user.name}</h3>
                                    <p>สถานะ รอการอนุมัติ</p>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        อนุมัติ
                                </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                    >
                                        ปฏิเสธ
                                </Button>
                                </CardContent>
                            </Card>
                        )
                    }
                })}
            </div>

            <ModalSubmit openPrompt={openPrompt} setOpenPrompt={setOpenPrompt} handleClosePrompt={handleClosePrompt} handleSubmitPrompt={handleSubmitPrompt} />
        </div >
    )
}

export default AuthUser
