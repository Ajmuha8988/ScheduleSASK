import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { GetMember } from '../../utils/db/get/GetMembers';
import { MemberService } from '../../utils/db/post/AddMembers';
/*import { ruRU } from '@mui/x-data-grid/locales'*/
import localization from '../../utils/Localization/Ru';
import { DeleteMemberService } from '../../utils/db/delete/deletemember';

interface RowType {
    ID_members_group: string; // Например, число или строка
}


const theme = createTheme({
    typography: {
        fontFamily: ['"Vollda"'].join(',')
    },
});

// Компонент списка членов
const ListMembers = () => {
    const { deleteGroupMember } = DeleteMemberService();
    const DeleteMemberSubmit = async (idStudent: string) => {
        try {
            await deleteGroupMember({
                ID_Students: idStudent 
            });
            window.location.reload();
        } catch (error) {
            if (error instanceof Error) {
                alert('Ошибка на сервере. Повторите попытку позже.');
            } else {
                alert('Ошибка на сервере. Повторите попытку позже.');
            } 
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
            renderCell: (params: GridRenderCellParams<RowType>) => ( // кнопка удаления внутри ячейки
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
                                rows={
                                    dataMembers
                                        ?.filter(row => typeof row === 'object' && row !== null && 'ID_members_group' in row)
                                        ?.map((row, index) => ({ ...row, ID: index + 1 }))
                                    ?? []
                                
                                } columns={columns}
                                getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                                showToolbar
                                className="mt-2 font-for-headers"
                                hideFooter
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnMenu
                                label={namegroups || ""}
                                localeText={localization.ru}
                                sx={{
                                    cell: {
                                        color: "#fff",
                                        outlineColor: "white"

                                    },
                                color: "#fff",
                                backgroundColor: "#000",
                                outlineColor: "white",
                                "& .MuiOutlinedInput-root": {
                                    fieldset: {
                                        borderColor: "white !important",
                                    },
                                    ":hover fieldset": {
                                    borderColor: "white",
                                    },
                                    ".Mui-focused fieldset": {
                                    borderColor: "#fff",
                                    },
                                },
                                    ".MuiInputBase-root": {
                                    color: "#fff",
                                    },
                                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-row:focus  ":
                                    {
                                        outline: "none",
                                    },
                                    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                                        outline: "none !important",
                                    },
                                    "& .MuiDataGrid-columnHeader":
                                    {
                                        backgroundColor: '#fff', // Цвет фона заголовка колонки
                                        color: '#000',              // Цвет шрифта
                                        outlineColor: "white"
                                    },
                                    "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                                    {
                                        outline: "none !important",
                                    },
                                    "& .MuiDataGrid-row.Mui-selected": { // Новый блок для выделения строки
                                        backgroundColor: "inherit !important"
                                    },
                                    "& .MuiDataGrid-row": {
                                        backgroundColor: "inherit",
                                        outlineColor: "white" // Or 'transparent' or whatever color you'd like
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
