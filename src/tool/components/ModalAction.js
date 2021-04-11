import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";



// Component
import { Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
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
    }
}));


function ModalAction(props) {

    const { onSubmitRequest, onSubmitAdd, inputHandler, formState, handleCloseModal,
        openModal, headerForm, headerId, setOpenModal } = props;
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal-action"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{headerForm}</h2>
                    <form onSubmit={headerId == "เบิก" ? onSubmitRequest : onSubmitAdd}>
                        <Input
                            id="total"
                            element="input"
                            type="number"
                            label="จำนวน"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid Total."
                            onInput={inputHandler}
                            required
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="รายละเอียดเพิ่มเติม"
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            fullWidth
                            className={classes.textarea}
                        />
                        <div className="modal-action-btn-group">
                            <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid} >ยืนยัน</Button>
                            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>ยกเลิก</Button>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalAction
