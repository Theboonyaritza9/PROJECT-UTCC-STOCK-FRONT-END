import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


// Components
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SelectCategory(props) {

    const classes = useStyles();
    const { selectValue, setCategoryValue, categoryValue, initialValue } = props;

    useEffect(() => {
        if(initialValue) {
            setCategoryValue(initialValue)
            console.log("work")
        }
        return () => {
            
        }
    }, [])

    const onChange = (e) => {
        setCategoryValue(e.target.value)
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}  >
            <InputLabel id="category">ประเภท</InputLabel>
            <Select
                id="category"
                labelId="category"
                value={categoryValue}
                onChange={onChange}
                label="ประเภท"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {selectValue.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectCategory
