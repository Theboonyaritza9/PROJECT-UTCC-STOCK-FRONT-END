import React, { useState, useEffect } from 'react';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { boardItem } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import { makeStyles } from '@material-ui/core/styles';
import { useFilter } from "../../shared/util/SelectFilterBoard";


// Component
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple';
import Input from "../../shared/components/FormElements/Input";
import SelectComponent from "../../shared/components/FormElements/Select";
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";
import ListToolSelected from "../components/ListToolSelected";


// Icon
import AddIcon from '@material-ui/icons/Add';

// CSS
import "./EditBoard.css";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));




function EditBoard() {

    const classes = useStyles();
    const [board] = useState(boardItem);
    const [toolSelected, setToolSelected] = useState(board.tools)
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [file, setFile] = useState(board.imageProfile);
    const [files, setFiles] = useState(board.images);
    const [total] = useState(board.total);
    const [type, setType] = useState(board.type);
    const [limit, setLimit] = useState(board.limit);
    const [description, setDescription] = useState(board.description);
    const [boardCode, setBoardCode] = useState(board.boardCode);
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolBackup, setToolBackup] = useState(board.tools);
    const [tools, setTools] = useState([]);

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            total: {
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

        let temArr = []
        for (var count = 0; count < board.tools.length; count++) {
            if (temArr.length === 0) {
                temArr = toolList.tools.filter((item) => board.tools[count].id !== item.id)
            }
            if (temArr.length > 0) {
                let filterData = temArr.filter((item) => board.tools[count].id !== item.id)
                temArr = filterData
            }
        }

        setTools(temArr)

        return () => {

        }
    }, [toolList.tools])

    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            boardName: formState.inputs.name.value,
            boardCode: boardCode,
            total: total,
            type: type,
            imageProfile: file,
            limit: limit,
            description: description,
            tools: toolSelected,
            images: files
        }

        console.log(newTool);
    }


    return (
        <Container>
            <h1>แก้ไข {board.boardName}</h1>
            <Paper>
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อบอร์ด"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid board name."
                        onInput={inputHandler}
                        initialValue={board.boardName}
                        initialValid={true}
                        required
                    />
                    <TextField
                        label="รหัสบอร์ด"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={boardCode}
                        className={classes.margin}
                        onChange={(e) => setBoardCode(e.target.value)}
                    />
                    <TextField
                        label="จำกัด"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={limit}
                        className={classes.margin}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                    <div className="editboard-input-group">      
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวน"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="โปรดใส่ข้อมูล."
                                onInput={inputHandler}
                                initialValue={total}
                                initialValid={true}
                            />
                        <TextField
                            label="ชนิด"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={type}
                            // className={classes.inputFilter}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <h3>อุปกรณ์</h3>
                    <div className="editboard-toolSelected">
                        <div className="editboard-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="ชนิด" dataType="type" onChange={useTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="ประเภท" dataType="category" onChange={useCategoryFilter} value={categorySelect} />
                        </div>
                        <div className="">
                            <SelectComponent list={categoryFilter} typeFilter="tool" filterName="ชื่ออุปกรณ์" dataType="name" onChange={useNameFilter} value={nameSelect} />
                        </div>
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.margin}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className="editboard-btn-add" startIcon={<AddIcon />} onClick={useOnSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในบอร์ด</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={useDeleteToolSelected} />
                    </div>
                    <ImageUpload file={file} setFile={setFile} />
                    <ImageUploadMultiple files={files} setFiles={setFiles} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="รายละเอียดอื่นๆ"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.margin}
                        disabled={!formState.isValid}
                    >
                        อัพเดต
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default EditBoard
