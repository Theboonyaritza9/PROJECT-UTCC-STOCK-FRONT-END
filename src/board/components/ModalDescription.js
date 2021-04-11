import React from 'react';
import { Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { makeStyles } from '@material-ui/core/styles';

// Component
import Input from "../../shared/components/FormElements/Input";

// CSS
import "./ModalAction.css";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textarea: {
        margin: "10px 0"
    },
}));

function ModalAction(props) {

    const { handleClosePrompt, openPrompt, data } = props;
    const classes = useStyles();


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openPrompt}
            onClose={handleClosePrompt}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openPrompt}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">รายละเอียดเพิ่มเติม</h2>
                    {data.actionType === "request" && <p className="historyboard-h4">จำนวนอุปกรณ์ที่ใช้ไป</p>}
                    {data.tools && data.actionType === "request" && data.tools.map((tool) => (
                        <div className="historyboard-description" key={tool.id}>
                            <p>{tool.toolName}</p>
                            <p>{Number(tool.total) * Number(data.total)}</p>
                        </div>
                    ))}
                    <div>
                        <p className="historyboard-h4">รายละเอียดอื่นๆ</p>
                        <p>{data.description}</p>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalAction