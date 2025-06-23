import {TextField, Autocomplete} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GetAllgroups } from '../../utils/db/get/GetAllGroup';
import { useState, useEffect } from 'react';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
import { changeGroupService } from '../../utils/db/post/changeGroupInPSchedule';
import './mobileheaders.css';
import { useNavigate } from 'react-router-dom';

const StyledTextField = styled(TextField)({
    "& .MuiInputLabel-shrink": {
        transform: 'translate(70px, 9px)',
    },
});
const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiFormLabel-root.Mui-focused": {
        fontFamily: 'Vollda',
        color: '#212529',
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: '10px !important'
    },
    "& .MuiFormLabel-root": {
        fontFamily: 'Vollda',
        color: '#212529',
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
        fontFamily: 'Vollda',
        color: "#212529",
    },
    "& .MuiAutocomplete-inputRoot": {
        fontFamily: 'Vollda',
        color: "#212529",
        backgroundColor: '#ffffff',

        "& .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#ffffff",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#ffffff"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            fontFamily: 'Vollda',
            borderColor: "#ffffff",
            display: 'none !important' /* Убираем стандартное поведение прорези  ffc107*/
        }
    }
});
interface OptionType {
    label: string;
    value: bigint;
}
const GroupChangeList = () => {
    const [CurrentNameGroup, SetCurrentNameGroup] = useState('');
    const { dataGroupName } = GetNamegroup();
    const navigate = useNavigate();
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : '';
    useEffect(() => {
        SetCurrentNameGroup(nameGroup); // устанавливаем состояние только один раз
    }, [nameGroup]);
    const group = GetAllgroups();
    const optionsGroup = group?.length > 0 ? group.map(groups => ({
        label: `${groups.NameGroup}`,
        value: groups.ID_Group,
    })) : [];
    const { EventChangeGroup } = changeGroupService();
    const changeGroup = async (groupId: string) => {
        try {
            await EventChangeGroup({ NameGroup: groupId });
            switch (location.pathname) {
                case '/administrator':
                    window.location.reload();
                    break;
                case '/':
                    window.location.reload();
                    break;
                default:
                    navigate('/administrator');
            } 
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert(String(error));
            } // Устанавливаем ошибку в состояние
        }
    };
  return (
      <StyledAutocomplete
          className="sms-1 w-200"
          id="combo-box-demo"
          options={optionsGroup}
          value={{ label: CurrentNameGroup }}
          noOptionsText={"Нету группы"}
          getOptionLabel={(option) => typeof option === 'object' && option !== null
              ? (option as OptionType).label
              : ''
          }
          renderInput={(params) => <StyledTextField
              {...params}
              label="группа"
          />}
          onChange={(_, newValue) => {
              const typedNewValue = newValue as OptionType;
              if (typedNewValue === null) {
                  SetCurrentNameGroup('');
              }
              else {
                  if (typedNewValue && typedNewValue.value) {
                      changeGroup(typedNewValue.label); // Сразу вызываем смену группы при выборе нового значения
                  }
                  SetCurrentNameGroup('');
              }

          }}
          size='small' disablePortal
          sx={{
              '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
                  color: '#fff',
                  backgroundColor: '#ffc107',
                  fontFamily: 'Vollda, sans-serif',
              },
               '& + .MuiAutocomplete-popper .MuiAutocomplete-noOptions': {
                  color: '#fff',
                  backgroundColor: '#ffc107',
                  fontFamily: 'Vollda, sans-serif',
              },
               '& + .MuiAutocomplete-popper .MuiPaper-root': {
                  backgroundColor: '#ffc107',
              },
              '& + .MuiAutocomplete-popper .MuiAutocomplete-option[data-focus="true"]': {
                  backgroundColor: '#050505',     // Новый цвет фона при фокусе на пункте
                  color: '#fff',                 // Текст белого цвета
              },
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
                  backgroundColor: "#050505", // Цвет фона при наведении мыши
                  color: "#fff", // Цвет текста при наведении мыши
              },
          }}
      />
  );
}

export default GroupChangeList;