import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { validate } from "../../shared/util/validators";


// Component
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

function SelectType(props) {

    const classes = useStyles();

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput, selectValue, setCategorySelect } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
        if (props.initialValue) {
            let filterType = selectValue.filter((item) => item.type === props.initialValue);
            setCategorySelect(filterType[0].category);
        }
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        let filterType = selectValue.filter((item) => item.type === event.target.value);
        setCategorySelect(filterType[0].category);
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    return (
        <FormControl variant="outlined" className={classes.formControl} error={!inputState.isValid && inputState.isTouched}>
            <InputLabel id={id}><div>{props.filterName} <span style={{ color: "red", fontWeight: "bold" }}>*</span></div></InputLabel>
            <Select
                labelId={id}
                id={id}
                value={inputState.value}
                onChange={changeHandler}
                label="ชนิด"
                onBlur={touchHandler}
            >
                {selectValue.map((item) => (
                    <MenuItem key={item.id} value={item.type}>{item.type}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectType
