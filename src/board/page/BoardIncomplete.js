import React, { useState } from 'react';
import { boardIncompleteList } from "../../Api";
import { Button } from '@material-ui/core';
import { useForm } from "../../shared/hooks/form-hook";
import { makeStyles } from '@material-ui/core/styles';

// Icon
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalIncompleteBoard from '../components/ModalIncompleteBoard';

// Component

// CSS
import "./BoardIncomplete.css";
import ModalSubmit from '../../shared/components/UIElements/ModalSubmit';

const useStyles = makeStyles((theme) => ({
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
    const [headerPrompt, setHeaderPrompt] = useState('');
    const [openPrompt, setOpenPrompt] = useState(false);
    const [data, setData] = useState("");
    const [promptType, setPromptType] = useState("");

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


    const handleOpenPrompt = (value, type) => {
        setOpenPrompt(true)
        setData(value)
        setPromptType(type)
    }

    const handleClosePrompt = () => {
        setOpenPrompt(true)
        setData("")
    }
    const handleSubmitPrompt = (e) => {
        e.preventDefault();
        if(promptType === "delete") {
            console.log(data)
        } else {
            console.log(data)
        }

        setData("")
        setOpenPrompt(false)
        setPromptType("")
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
                                    <img src="https://i.pinimg.com/564x/95/c8/d2/95c8d2413663f98c43fbd51aa3791bdb.jpg" alt="555" />
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
                                        onClick={() => handleOpenPrompt(item, "update")}
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
                                        onClick={() => handleOpenPrompt(item.id, "delete")}

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

            <ModalIncompleteBoard
                openPrompt={openInput}
                handleClosePrompt={handleCloseInput}
                headerPrompt={headerPrompt}
                handleSubmitPrompt={handleSubmitInput}
                formState={formState}
                inputHandler={inputHandler}
            />

            <ModalSubmit
                handleClosePrompt={handleClosePrompt}
                handleSubmitPrompt={handleSubmitPrompt}
                openPrompt={openPrompt}
            />
        </div>
    )
}

export default BoardIncomplete
