import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ListPlanFirstSemester } from '../../utils/DataForTable/ListPlanFirstSemester';
import { ListPlanSecondSemester } from '../../utils/DataForTable/ListPlanSecondSemester';
import { MemberService } from '../../utils/db/post/AddMembers';
/*import { ruRU } from '@mui/x-data-grid/locales'*/
import localization from '../../utils/Localization/Ru';
import { DeleteFirstSemesterPlanService } from '../../utils/db/delete/deleteplanFirstSemester';
import { DeleteSecondSemesterPlanService } from '../../utils/db/delete/deleteplanSecondSemester';
import CircularProgress from '@mui/material/CircularProgress';

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
const ListSemesterPlan = () => {
    const { deleteFirstSemesterPlan } = DeleteFirstSemesterPlanService();
    const { deleteSecondSemesterPlan } = DeleteSecondSemesterPlanService();
    const DeleteFirstSemesterPlanSubmit = async (callnumbers,
        namelessons, namegroups, timeforlessons, numberhourinweek) => {
        try {
             await deleteFirstSemesterPlan({
                CallNumbers: callnumbers,
                NameLessons: namelessons,
                NameGroups: namegroups,
                TimeForLessons: timeforlessons,
                NumberHourInWeeks: numberhourinweek
            });
        } catch (error) {
            console.log(error);
        }
    };
    const DeleteSecondSemesterPlanSubmit = async (callnumbers,
        namelessons, namegroups, timeforlessons, numberhourinweek) => {
        try {
            await deleteSecondSemesterPlan({
                CallNumbers: callnumbers,
                NameLessons: namelessons,
                NameGroups: namegroups,
                TimeForLessons: timeforlessons,
                NumberHourInWeeks: numberhourinweek
            });
        } catch (error) {
            console.log(error);
        }
    };
    const styles = {
        breakLine: {
            whiteSpace: 'pre-line', // Для перевода строки (\n) применяется именно этот стиль
        },
    };

    const columnsFirstSemester = [
        { field: 'ID', headerName: '№', minWidth: 50, flex: 1 },
        { field: 'Lastname', headerName: 'Фамилия', minWidth: 150, flex: 1 },
        { field: 'Firstname', headerName: 'Имя', minWidth: 150, flex: 1 },
        { field: 'Patronymic', headerName: 'Отчество', minWidth: 150, flex: 1 },
        { field: 'CallNumber', headerName: 'Номер телефона', minWidth: 150, flex: 1 },
        { field: 'NameLesson', headerName: 'Наименование предмета', minWidth: 150, flex: 1 },
        { field: 'NameGroup', headerName: 'Группа', minWidth: 100, flex: 1 },
        { field: 'TimeForLesson', headerName: 'Всего часов на предмет', minWidth: 150, flex: 1 },
        { field: 'NumberHourInWeek', headerName: 'Количество часов в неделю', minWidth: 150, flex: 1 },
        {
            field: 'action',
            minWidth: 150,
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: (params) => ( // кнопка удаления внутри ячейки
                <form className="font-for-headers" onSubmit={() => DeleteFirstSemesterPlanSubmit(params.row.CallNumber,
                    params.row.NameLesson, params.row.NameGroup,
                    params.row.TimeForLesson, params.row.NumberHourInWeek)}>
                    <button type="submit" className="btn btn-warning text-light" >Удалить</button>
                </form>
            ),
            flex: 1
        }
    ];// Создаем тему шрифта Vollda
    const columnsSecondSemester = [
        { field: 'ID', headerName: '№', minWidth: 50, flex: 1 },
        { field: 'Lastname', headerName: 'Фамилия', minWidth: 150, flex: 1 },
        { field: 'Firstname', headerName: 'Имя', minWidth: 150, flex: 1 },
        { field: 'Patronymic', headerName: 'Отчество', minWidth: 150, flex: 1 },
        { field: 'CallNumber', headerName: 'Номер телефона', minWidth: 150, flex: 1 },
        { field: 'NameLesson', headerName: 'Наименование предмета', minWidth: 150, flex: 1 },
        { field: 'NameGroup', headerName: 'Группа', minWidth: 100, flex: 1 },
        { field: 'TimeForLesson', headerName: 'Всего часов на предмет', minWidth: 150, flex: 1 },
        { field: 'NumberHourInWeek', headerName: 'Количество часов в неделю', minWidth: 150, flex: 1 },
        {
            field: 'action',
            minWidth: 150,
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: (params) => ( // кнопка удаления внутри ячейки
                <form className="font-for-headers" onSubmit={() => DeleteSecondSemesterPlanSubmit(params.row.CallNumber,
                    params.row.NameLesson, params.row.NameGroup,
                    params.row.TimeForLesson, params.row.NumberHourInWeek)}>
                    <button type="submit" className="btn btn-warning text-light" >Удалить</button>
                </form>
            ),
            flex: 1
        }
    ];// Создаем тему шрифта Vollda
    const { filteredFirstData, loadingFirstPlan } = ListPlanFirstSemester();
    const { filteredDataForSecondSemester, loadingSecondPlan } = ListPlanSecondSemester();
    const { namegroups } = MemberService();
    return (
        <>
            {(loadingFirstPlan && loadingSecondPlan) ? (
                <div className="text-center mt-5" >
                    <CircularProgress color="inherit" />
                </div >
            ) : (
                <>
                    <ThemeProvider theme={theme}>
                        <h2 className='mt-3'>1-ый семестр</h2>
                        <DataGrid
                            rows={filteredFirstData.map((row, index) => ({ ...row, ID: index + 1 })) || []}
                            columns={columnsFirstSemester}
                            getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                            showToolbar
                            className="mt-2 font-for-headers"
                            hideFooter
                            disableColumnFilter
                            disableColumnSelector
                            disableColumnMenu
                            label={<span style={{ color: '#fff' }}>{namegroups}</span>}
                            localeText={localization.ruForPlan}
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
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    whiteSpace: "normal",
                                    lineHeight: "normal"
                                },
                                "& .MuiDataGrid-columnHeader": {
                                    // Forced to use important since overriding inline styles
                                    height: "unset !important"
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    // Forced to use important since overriding inline styles
                                    maxHeight: "168px !important"
                                },
                                maxHeight: 540,
                            }}
                            slotProps={{
                                toolbar: {
                                    printOptions: { disableToolbarButton: true },
                                    csvOptions: { disableToolbarButton: true },
                                }
                            }}
                        />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <h2 className='mt-3'>2-ой семестр</h2>
                            <DataGrid
                                rows={filteredDataForSecondSemester.map((row, index) => ({ ...row, ID: index + 1 })) || []}
                                columns={columnsSecondSemester}
                                getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                                showToolbar
                                className="mt-2 font-for-headers"
                                hideFooter
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnMenu
                                label={<span style={{ color: '#fff' }}>{namegroups}</span>}
                                localeText={localization.ruForPlan}
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
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        whiteSpace: "normal",
                                        lineHeight: "normal"
                                    },
                                    "& .MuiDataGrid-columnHeader": {
                                        // Forced to use important since overriding inline styles
                                        height: "unset !important"
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        // Forced to use important since overriding inline styles
                                        maxHeight: "168px !important"
                                    },
                                    maxHeight: 540,
                                }}
                                slotProps={{
                                    toolbar: {
                                        printOptions: { disableToolbarButton: true },
                                        csvOptions: { disableToolbarButton: true },
                                    }
                                }}
                            />
                        </ThemeProvider>
                </>
            )}
        </>


    )
};

export default ListSemesterPlan;
