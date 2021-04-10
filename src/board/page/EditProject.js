import React, { useState, useEffect } from 'react';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { projectItem } from "../../ApiHistory";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import { makeStyles } from '@material-ui/core/styles';
import { useFilter } from "../../shared/util/SelectFilterProject";
import { CheckProject } from "../../shared/util/CheckProject";
import { useOnSubmitProject } from "../../shared/util/SubmitProject";

// Component
import Input from "../../shared/components/FormElements/Input";
import ListToolSelected from "../components/ListToolSelected";
import SelectComponent from "../../shared/components/FormElements/Select";
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple';

// CSS
import "./EditProject.css"


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "20px 0"
    },
    btnCheck: {
        margin: "10px 0",
        backgroundColor: "#FFC107"
    },
}));




function EditProject() {

    const classes = useStyles();
    const [project] = useState(projectItem);
    const [toolSelected, setToolSelected] = useState(project.tools)
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [file, setFile] = useState(project.profileImage);
    const [files, setFiles] = useState(project.images);
    const [total] = useState(project.total);
    const [type, setType] = useState(project.type);
    const [description, setDescription] = useState(project.description);
    const [projectCode, setprojectCode] = useState(project.projectCode);
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolBackup, setToolBackup] = useState(project.tools);
    const [tools, setTools] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [validTool, setValidTool] = useState(false);
    const [validBtn, setValidBtn] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validTotal, setValidTotal] = useState(false);
    const [toolCal] = useState(toolList.tools);

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
        totalSelect, toolSelected, validTotal,
        setTotalSelect, setToolSelected, setValidName, setValidBtn, setValidTotal, setOpenAlert
    );

    const [useOnSubmitCheck] = CheckProject(
        formState, toolSelected, toolCal,
        setOpenAlert, setValidTool
    )

    const [onSubmit] = useOnSubmitProject(
        formState, projectCode, type, file, description, toolSelected, files, validTool
    );

    useEffect(() => {
        // ดึงข้อมูลอุปกรณ์สำหรับเพิ่มลงในรายการบอร์ด
        dispatch(toolListAction());
        // กำหนดค่าอาเรย์ของอุปกรณ์ โดยนำข้อมูล อุปกรณ์ที่ใช้ในบอร์ด(project.tools) มาลบกับ อุปกรณ์(toolList.tool) 
        let temArr = []
        for (var count = 0; count < project.tools.length; count++) {
            if(temArr.length === 0){
                temArr = toolList.tools.filter((item) => project.tools[count].id !== item.id)
            } 
            if(temArr.length > 0) {
                let filterData = temArr.filter((item) => project.tools[count].id !== item.id)
                temArr = filterData
            }
        }

        setTools(temArr)
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
        <Container>
            <h1>แก้ไข {project.projectName}</h1>
            <Paper>
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อโปรเจค"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="กรุณาใส่ข้อมูล."
                        onInput={inputHandler}
                        initialValue={project.projectName}
                        initialValid={true}
                        required
                    />
                    <TextField
                        label="รหัสโปรเจค"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={projectCode}
                        className={classes.margin}
                        onChange={(e) => setprojectCode(e.target.value)}
                    />
                    <div className="editproject-input-group">
                        <div onClick={handleAlert}>
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวนโปรเจค"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="โปรดใส่ข้อมูล."
                                onInput={inputHandler}
                                initialValue={total}
                                initialValid={true}
                            />
                        </div>
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
                    <div className="editproject-toolSelected">
                        <div className="editproject-select-group">
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
                            onChange={totalInput}
                        />
                        <Button variant="contained" size="small" color="primary" className="editproject-btn-add"
                            onClick={useOnSubmitToolSelected}
                            disabled={!validBtn}
                        >
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
                        label="รายละเอียด"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
                        value={description}
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
                        className={classes.margin}
                        disabled={!formState.isValid}
                    >
                        ยืนยัน
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default EditProject

