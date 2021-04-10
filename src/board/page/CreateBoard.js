import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import { useFilter } from "../../shared/util/SelectFilterBoard";

// Component
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import SelectComponent from '../../shared/components/FormElements/Select';
import ListToolSelected from '../components/ListToolSelected';
import Input from "../../shared/components/FormElements/Input";


// CSS
import "./CreateBoard.css";



const useStyles = makeStyles((theme) => ({
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0",
    },
    button: {
        margin: "20px 0"
    },
    inputFilter: {
        margin: "20px 0px",
        padding: "0 5px"
    },
    PaperFilter: {
        padding: "10px"
    },
    margin: {
        margin: "10px 0"
    }
}));

function CreateBoard() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [tools, setTools] = useState([])
    const [file, setFile] = useState(null);
    const [total, setTotal] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [boardCode, setBoardCode] = useState('');
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);
    const [toolBackup, setToolBackup] = useState([])

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const [useTypeFilter, useCategoryFilter, useNameFilter, useOnSubmitToolSelected, useDeleteToolSelected] = useFilter(
        tools, toolBackup,typeFilter, categoryFilter, nameFilter,
        setTools, setToolBackup, setTypeFilter, setCategoryFilter, setNameFilter,
        setTypeSelect, setCategorySelect, setNameSelect,
        totalSelect, toolSelected,
        setTotalSelect, setToolSelected
    );


    useEffect(() => {
        // ดึงข้อมูลอุปกรณ์สำหรับเพิ่มลงในรายการบอร์ด
        dispatch(toolListAction());
        if (toolList.tools.length !== 0) {
            setTools(toolList.tools)
        }
        return () => {

        }
    }, [toolList.tools])

    // send data to front-end
    const onSubmit = (e) => {
        e.preventDefault();
        let newTool = {
            boardName: formState.inputs.name.value,
            boardCode: boardCode,
            total: total,
            type: type,
            imageProfile: file,
            boardlimit: '',
            description: description,
            tools: toolSelected
        }
        console.log(newTool);
    }

    return (
        <Container maxWidth="sm">
            <h1>สร้างบอร์ด</h1>
            <Paper className="createboard-form">
                <form onSubmit={onSubmit}>

                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อบอร์ด"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดใส่ข้อมูล."
                        onInput={inputHandler}
                        required
                    />

                    <TextField
                        label="รหัสบอร์ด"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setBoardCode(e.target.value)}
                    />
                    <h3>อุปกรณ์</h3>
                    <Paper className={classes.PaperFilter}>
                        <div className="editboard-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="ชนิด" dataType="type" onChange={useTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="ประเภท" dataType="category" onChange={useCategoryFilter} value={categorySelect} />
                        </div>
                        <SelectComponent list={categoryFilter} typeFilter="tool" filterName="ชื่ออุปกรณ์" dataType="name" onChange={useNameFilter} value={nameSelect} />
                        <TextField
                            label="จำนวนอุปกรณ์"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.inputFilter}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={useOnSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในบอร์ด</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={useDeleteToolSelected} />

                    </Paper>


                    <div className="createboard-input-group">
                        <TextField
                            label="จำนวนบอร์ด"
                            variant="outlined"
                            fullWidth
                            type="number"
                            className={classes.input}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            label="ชนิดงาน"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <ImageUpload file={file} setFile={setFile} />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="รายละเอียดเพิ่มเติม"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.textarea}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        disabled={!formState.isValid}
                    >
                        ยืนยัน
                </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default CreateBoard

// 279
