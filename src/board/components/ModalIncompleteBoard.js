import React from 'react';
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { makeStyles } from '@material-ui/core/styles';


// Component
import Input from "../../shared/components/FormElements/Input";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ModalIncompleteBoard(props) {

    const { inputHandler, formState, handleClosePrompt, handleSubmitPrompt, openPrompt, headerPrompt } = props;
    const classes = useStyles();


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal-action-board"
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
                    <h2 id="transition-modal-title">{headerPrompt}</h2>
                    <form onSubmit={handleSubmitPrompt}>
                        <Input id="total" element="input" label="จำนวนอุปกรณ์" type="number" errorText="Please fill data" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} required />
                        <div className="modal-action-board-btn-group">
                            <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>อัพเดต</Button>
                            <Button variant="contained" color="secondary" onClick={handleClosePrompt}>ยกเลิก</Button>
                        </div>
                    </form>
                </div>

            </Fade>
        </Modal>
    )
}

export default ModalIncompleteBoard