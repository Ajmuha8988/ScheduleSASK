import { useState } from 'react';
import "./mobilebody.css"
import { TextField, Autocomplete } from "@mui/material";
import { createTheme} from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { MemberService } from '../../utils/db/post/AddMembers';
import { GetStudents } from '../../utils/db/get/GetStudent';
import { styled } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        customColor: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});
const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiFormLabel-root.Mui-focused": {
        fontFamily: 'Vollda',
        color: '#616161'
    },
    "& .MuiFormLabel-root": {
        fontFamily: 'Vollda',
        color: '#616161'
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
        fontFamily: 'Vollda',
        color: "#616161"
    },
    "& .MuiAutocomplete-inputRoot": {
        fontFamily: 'Vollda',
        color: "#616161",

        "& .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#616161"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#616161"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#ffc107"
        }
    }
});

const AddMembersForm = () => {
    const { addMember } = MemberService();
    const [ID_Student, setID_Students] = useState(null); 
    const student = GetStudents(); 
    const options = student?.length > 0 ?  student.map(students => ({
        label: `${students.Lastname} ${students.Firstname} ${students.Patronymic}`,
        value: students.Temp_ID_User,
    })) : [];
    const [error, setError] = useState<string | null>(null);
    const AddMembersSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            try {
                await addMember({
                    ID_Students: ID_Student
                });
                window.location.reload();
            } catch (error) {
                setError(error.message)
            }
        
    };
    return (
            <form className="font-for-headers h-100 col-lg-9 col-sm-12 row" onSubmit={AddMembersSubmit} method="POST">
                <StyledAutocomplete
                    className="w-75 smw-100"
                    id="combo-box-demo"
                    options={options}
                    noOptionsText={"Нет студентов"}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField
                       required
                       InputLabelProps={{
                           style: {
                               fontFamily: 'Vollda'
                            }
                        }}
                        {...params}
                        label="Студент" />}
                    onChange={(event, newValue) => {
                        // Установка идентификатора студента при изменении выбора
                        setID_Students(newValue?.value);
                    }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-warning text-light w-15 smw-40  smw-30 smmx-13 mt-2 h-25" >Добавить</button>
            </form>
    );
};

export default AddMembersForm;