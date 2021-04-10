import React, { useState } from 'react';
import { boardIncompleteList } from "../../Api";
import { Button, Modal, Backdrop, Fade } from '@material-ui/core';
import { useForm } from "../../shared/hooks/form-hook";
import { makeStyles } from '@material-ui/core/styles';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

// Icon
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

// Component
import Input from '../../shared/components/FormElements/Input';

// CSS
import "./BoardIncomplete.css";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: "20px 0"
    },
    buttonInTable: {
        margin: "5px 0"
    },
    margin: {
        margin: "10px 0"
    }
}));

function BoardIncomplete() {

    const classes = useStyles();
    const [toolList] = useState(boardIncompleteList);
    const [openInput, setOpenInput] = useState(false);
    const [toolSelected, setToolSelected] = useState({});
    const [headerPrompt, setHeaderPrompt] = useState('')

    const onClickUpdateAll = (items) => {
        console.log(items)
    }

    const [formState, inputHandler] = useForm(
        {
            total: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const handleOpenInput = (value, tool) => {
        setOpenInput(true);
        setToolSelected(value);
        setHeaderPrompt(`${tool.toolName} ของ ${value.boardName}`)
    }

    const handleCloseInput = () => {
        setOpenInput(false);
        setToolSelected({})
        setHeaderPrompt("")
    }

    const handleSubmitInput = (e) => {
        e.preventDefault()
        setOpenInput(false);
        setToolSelected({})
        setHeaderPrompt("")
        console.log(formState.inputs.total.value)
        console.log(toolSelected)
    }

    return (
        <div className="container-incomplete">
            <div className="section-incomplete">
                <div className="headername-incomplete"><h3>อุปกรณ์ไม่ครบ</h3></div>
                <div>
                    {toolList.map((item) => (
                        <div className="cover-incomplete" key={item.id}>
                            <div className="header-incomplete">
                                <div className="proflie-img-incomplete">
                                    <img src="/images/profile.png" alt="555" />
                                </div>
                                <div>
                                    <p>{item.username} ({item.userStatus})</p>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                            <div className="content-incomplete">
                                <h3>{item.boardName}</h3>
                                <div className="detail-incomplete">
                                    <table className="table-incomplete">
                                        <thead style={{ background: "#EAE6EB" }}>
                                            <tr>
                                                <th>ชื่ออุปกรณ์</th>
                                                <th>จำนวนค้าง</th>
                                                <th>อื่นๆ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.tools.map((tool) => (
                                                <tr key={tool.id}>
                                                    <th>{tool.toolName}</th>
                                                    <th>{tool.total}</th>
                                                    <th>
                                                        <Button
                                                            type="button"
                                                            variant="outlined"
                                                            color="primary"
                                                            fullWidth
                                                            size="small"
                                                            className={classes.buttonInTable}
                                                            onClick={() => handleOpenInput(item, tool)}
                                                        >
                                                            อัพเดต
                                                        </Button>
                                                    </th>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-incomplete">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="small"
                                        className={classes.button}
                                        startIcon={<UpdateIcon />}
                                        onClick={() => onClickUpdateAll(item.tools)}
                                    >
                                        อัพเดตทั้งหมด
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        size="small"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="figure-box"></div>
            <div className="figure-bar"></div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openInput}
                onClose={handleCloseInput}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openInput}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{headerPrompt}</h2>
                        <form onSubmit={handleSubmitInput}>
                            <Input id="total" element="input" label="จำนวนอุปกรณ์" type="number" errorText="Please fill data" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} required />
                            <div className="TableHistoryTool-action">
                                <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>อัพเดต</Button>
                                <Button variant="contained" color="secondary" onClick={handleCloseInput}>ยกเลิก</Button>
                            </div>
                        </form>
                    </div>

                </Fade>
            </Modal>
        </div>
    )
}

export default BoardIncomplete
