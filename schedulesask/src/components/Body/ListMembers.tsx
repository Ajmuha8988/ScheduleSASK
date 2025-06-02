import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { GetMember } from '../../utils/db/get/GetMembers';
import { MemberService } from '../../utils/db/post/AddMembers';
/*import { ruRU } from '@mui/x-data-grid/locales'*/
import localization from '../../utils/Localization/Ru';
import { DeleteMemberService } from '../../utils/db/delete/deleteMember';

const theme = createTheme({
    typography: {
        fontFamily: ['"Vollda"'].join(',')
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                row: {
                    "&.Mui-selected": {
                        backgroundColor: "inherit",
                        color: "yellow",
                        "&:hover": {
                            backgroundColor: "inherit"
                        },
                        outlineColor: "white"
                    }
                },
                columnHeader: {
                    backgroundColor: '#fff', // Цвет фона заголовка колонки
                    color: '#000',              // Цвет шрифта
                    outlineColor: "white"
                },
                root: {
                    color: "#fff",
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#fff',
                        },
                    },
                    '.MuiInputBase-root': {
                        color: '#fff'
                    },
                    backgroundColor: "#000",
                    outlineColor: "white"
                },
                cell: {
                    color: "#fff",
                    outlineColor: "white"

                },
            },
        },
    },
});

// Компонент списка членов
const ListMembers = () => {
    const { deleteGroupMember } = DeleteMemberService();
    const DeleteMemberSubmit = async (idStudent) => {
        try {
            await deleteGroupMember({
                ID_Students: idStudent 
            });
            window.location.reload();
        } catch (error) {
            alert('Ошибка на сервере. Повторите попытку позже.');
        }

    };
    const columns = [
        { field: 'ID', headerName: '№', minWidth: 150, flex: 1 },
        { field: 'ID_members_group', headerName: 'ID_студента', minWidth: 150, flex: 1 },
        { field: 'Lastname', headerName: 'Фамилия', minWidth: 150, flex: 1 },
        { field: 'Firstname', headerName: 'Имя', minWidth: 150, flex: 1 },
        { field: 'Patronymic', headerName: 'Отчество', minWidth: 150, flex: 1 },
        {
            field: 'action',
            minWidth: 150,
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: (params) => ( // кнопка удаления внутри ячейки
                <form className="font-for-headers" onSubmit={() => DeleteMemberSubmit(params.row.ID_members_group)}>
                    <button type="submit" className="btn btn-warning text-light" >Удалить</button>
                </form>
            ),
            flex: 1
        }
    ];// Создаем тему шрифта Vollda

    const { dataMembers, loading } = GetMember();
    const { namegroups } = MemberService();
    return (
        <>
            {
                loading ? (
                    <div className="text-center mt-5">
                        <CircularProgress color="inherit" />
                    </div >
                ) : (
                    <ThemeProvider theme={theme}>
                            <DataGrid
                                rows={ dataMembers.map((row, index) => ({ ...row, ID: index + 1 })) || []}
                                columns={columns}
                                getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                                showToolbar
                                className="mt-2 font-for-headers"
                                hideFooter
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnMenu
                                label={<span style={{ color: '#fff' }}>{namegroups}</span>}
                                localeText={localization.ru}
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-row:focus  ":
                                    {
                                        outline: "none",
                                    },
                                    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                                        outline: "none !important",
                                    },
                                    "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                                    {
                                        outline: "none !important",
                                    },
                                    "& .MuiDataGrid-row:hover": {
                                        backgroundColor: "inherit" // Or 'transparent' or whatever color you'd like
                                    },
                                    "& .MuiDataGrid-overlay": {
                                        backgroundColor: "#000",
                                    },
                                    "& .MuiDataGrid-toolbar": {
                                        backgroundColor: "#ffc107",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        fill: "#ffffff", // Цвет иконок
                                    },
                                    maxHeight: 640,
                                }}
                                slotProps={{
                                    toolbar: {
                                        printOptions: { disableToolbarButton: true },
                                        csvOptions: { disableToolbarButton: true },
                                    }
                                }}
                            />
                    </ThemeProvider>)
            }
                    
        </>
        
    );
};

export default ListMembers;
