import { useState } from 'react';
import "./mobilebody.css"
import { TextField, Autocomplete } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import * as React from 'react';
import { MemberService } from '../../utils/db/post/AddMembers';
import { GetStudents } from '../../utils/db/get/GetStudent';
import { styled } from "@mui/material/styles";

interface OptionType {
    label: string;
    value: bigint;
}


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
    const [ID_Student, setID_Students] = useState<bigint | null>(null); 
    const student = GetStudents(); 
    const options = student?.length > 0 ?  student.map(students => ({
        label: `${students.Lastname} ${students.Firstname} ${students.Patronymic}`,
        value: students.Temp_ID_User,
    })) : [];
    const [error, setError] = useState<string | null>(null);
    const AddMembersSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!addMember || !ID_Student) {
            setError("Невозможно добавить члена группы.");
            return;
        }

        try {
            await addMember({ ID_Students: ID_Student });
            window.location.reload();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err)); // Конвертируем err в строку, если это не стандартный Error
            }
        }
        
    };
    return (
            <form className="font-for-headers h-100 col-lg-9 col-sm-12 row" onSubmit={AddMembersSubmit} method="POST">
                <StyledAutocomplete
                    className="w-75 smw-100"
                    id="combo-box-demo"
                    options={options}
                    noOptionsText={"Нет студентов"}
                    getOptionLabel={(option) => typeof option === 'object' && option !== null
                    ? (option as OptionType).label
                    : ''
                    }
                    renderInput={(params) => <TextField
                       required
                        {...params}
                        label="Студент" />}
                        onChange={(_, newValue) => {
                        const typedNewValue = newValue as OptionType;
                        setID_Students(typedNewValue.value);
                    }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-warning text-light w-15 smw-40  smw-30 smmx-13 mt-2 h-25" >Добавить</button>
            </form>
    );
};

export default AddMembersForm;