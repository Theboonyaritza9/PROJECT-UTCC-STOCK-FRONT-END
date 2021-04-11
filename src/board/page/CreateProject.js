import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import { useFilter } from "../../shared/util/SelectFilterProject";
import { CheckProject } from "../../shared/util/CheckProject";
import { useOnSubmitProject } from "../../shared/util/SubmitProject";

// Component
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import SelectComponent from '../../shared/components/FormElements/Select';
import ListToolSelected from '../components/ListToolSelected';
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple';
import Input from "../../shared/components/FormElements/Input";
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";
import { toast } from "react-toastify";

// CSS
import "./CreateProject.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "30px auto"
    },
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0"
    },
    button: {
        margin: "20px 0"
    },
    PaperFilter: {
        padding: "10px"
    },
    margin: {
        margin: "10px 0"
    },
    btnCheck: {
        margin: "10px 0",
        backgroundColor: "#FFC107"
    },
}));

function CreateProject() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [tools, setTools] = useState([]);
    const [toolCal, setToolCal] = useState([]);
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [projectCode, setProjectCode] = useState('');
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);
    const [files, setFiles] = useState(null);
    const [toolBackup, setToolBackup] = useState([])
    const [openAlert, setOpenAlert] = useState(false);
    const [validTool, setValidTool] = useState(false);
    const [validBtn, setValidBtn] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validTotal, setValidTotal] = useState(false);

    const notify = () => {
        toast.success("อุปกรณ์มีเพียงพอในสต๊อก", { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, className: "notify-success-project" })
    }

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
        tools, toolBackup, typeFilter, categoryFilter, nameFilter,
        setTools, setToolBackup, setTypeFilter, setCategoryFilter, setNameFilter,
        setTypeSelect, setCategorySelect, setNameSelect,
        totalSelect, toolSelected, validTotal,
        setTotalSelect, setToolSelected, setValidName, setValidBtn, setValidTotal, setOpenAlert
    );

    const [useOnSubmitCheck] = CheckProject(
        formState, toolSelected, toolCal,
        setOpenAlert, setValidTool, notify
    )

    const [onSubmit] = useOnSubmitProject(
        formState, projectCode, type, file, description, toolSelected, files, validTool
    );

    useEffect(() => {
        dispatch(toolListAction());
        if (toolList.tools.length !== 0) {
            setTools(toolList.tools);
            setToolCal(toolList.tools);

        }
        return () => {

        }
    }, [toolList.tools])

    const handleAlert = () => {
        setOpenAlert(false)
    }

    const totalInput = (e) => {
        if (e.target.value === "") {
            setValidTool(false)
            setValidBtn(false)
        } else {
            setValidTotal(true)
            setValidBtn(validName && true)
        }
        setTotalSelect(e.target.value)
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <h1>สร้างโปรเจค</h1>
            <Paper className="createproject-form">
                <form onSubmit={onSubmit}>
                    <div onClick={handleAlert}>
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="ชื่อโปรเจค"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            required
                        />
                    </div>

                    <TextField
                        label="รหัสโปรเจค"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setProjectCode(e.target.value)}
                    />

                    <div className="createproject-input-group">
                        <div onClick={handleAlert} className="grid-input">
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวน"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="โปรดใส่ข้อมูล."
                                onInput={inputHandler}
                                required
                            />
                        </div>
                        <TextField
                            label="ชนิดงาน"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <Paper className={classes.PaperFilter}>
                        <h3>อุปกรณ์</h3>
                        <div className="createproject-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="ชนิด" dataType="type" onChange={useTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="ประเภท" dataType="category" onChange={useCategoryFilter} value={categorySelect} />
                        </div>
                        <SelectComponent list={categoryFilter} typeFilter="tool" filterName="ชื่ออุปกรณ์" dataType="name" onChange={useNameFilter} value={nameSelect} />
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.margin}
                            onChange={totalInput}
                        />
                        <Button variant="contained" size="small" color="primary" className={classes.margin}
                            disabled={!validBtn} onClick={useOnSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในโปรเจค</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={useDeleteToolSelected} />

                    </Paper>

                    <ImageUpload file={file} setFile={setFile} />

                    <Divider />

                    <ImageUploadMultiple files={files} setFiles={setFiles} />

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
                        type="button"
                        variant="contained"
                        fullWidth
                        className={classes.btnCheck}
                        disabled={formState.isValid === false || toolSelected.length === 0 ? true : false}
                        onClick={useOnSubmitCheck}
                    >
                        ตรวจสอบ
                    </Button>

                    {openAlert &&
                        <div className="alert-errordata">
                            <h3>รายการอุปกรณ์ไม่ครบ</h3>
                            {validTool && validTool.map((item) => (
                                <div key={item.id} className="valid-data">
                                    <p>{item.toolName}</p>
                                    <p>{item.total}</p>
                                </div>
                            ))}
                        </div>
                    }

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

export default CreateProject
