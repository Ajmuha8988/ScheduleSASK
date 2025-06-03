import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react'
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
});
interface RowData {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    NameLesson: string;
    NameGroup: string;
    CallNumber: string;
    TimeForLesson: number;
    NumberHourInWeek: number;
    KindOfSemester: string;
    _showFio?: boolean; // возможно, нам потребуется дополнительное свойство для показа ФИО
}
// Компонент списка членов
const ListSemesterPlan = () => {
    const { deleteFirstSemesterPlan } = DeleteFirstSemesterPlanService();
    const { deleteSecondSemesterPlan } = DeleteSecondSemesterPlanService();
    const DeleteFirstSemesterPlanSubmit = async (callnumbers: string,
        namelessons: string, namegroups: string, timeforlessons: number, numberhourinweek: number) => {
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
    const DeleteSecondSemesterPlanSubmit = async (callnumbers: string,
        namelessons: string, namegroups: string, timeforlessons: number, numberhourinweek: number) => {
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
    const { filteredFirstData, loadingFirstPlan } = ListPlanFirstSemester();
    const { filteredDataForSecondSemester, loadingSecondPlan } = ListPlanSecondSemester();
    const cachedRowsFirst = useMemo(() => {
        const cache: Record<string, boolean> = {};
        if (filteredFirstData) {
            return filteredFirstData.map(row => {
                const fullNameKey = `${row.Lastname}-${row.Firstname}-${row.Patronymic}`;
                const isFirstOccurrence = !cache.hasOwnProperty(fullNameKey);
                if (isFirstOccurrence) {
                    cache[fullNameKey] = true;
                }
                return {
                    ...row,
                    _showFio: isFirstOccurrence
                };
            });
        }
        return [];
    }, [filteredFirstData]);
    const cachedRowsSecond = useMemo(() => {
        const cache: Record<string, boolean> = {};
        if (filteredDataForSecondSemester) {
            return filteredDataForSecondSemester.map(row => {
                const fullNameKey = `${row.Lastname}-${row.Firstname}-${row.Patronymic}`;
                const isFirstOccurrence = !(cache.hasOwnProperty(fullNameKey));
                if (isFirstOccurrence) {
                    cache[fullNameKey] = true;
                }
                return {
                    ...row,
                    _showFio: isFirstOccurrence
                };
            });
        }
        return [];
    }, [filteredDataForSecondSemester]);

    // Рендерер для ФИО
    const renderFioCell = (params: GridRenderCellParams<RowData>) => {
        const currentRow = params.row as RowData;

        // Если объект строки невалидный, вернуть пустую строку
        if (!currentRow || typeof currentRow !== 'object') {
            console.error('Некорректный объект:', currentRow);
            return '';
        }

        // Должна ли данная строка отображать ФИО?
        if (!currentRow._showFio) {
            return '';
        }

        switch (params.field) {
            case 'Lastname':
                return currentRow.Lastname || '';
            case 'Firstname':
                return currentRow.Firstname || '';
            case 'Patronymic':
                return currentRow.Patronymic || '';
            default:
                return '';
        }
    };

    const columnsFirstSemester = [
        { field: 'ID', headerName: '№', minWidth: 50, flex: 1 },
        { field: 'Lastname', headerName: 'Фамилия', minWidth: 150, flex: 1, renderCell: renderFioCell },
        { field: 'Firstname', headerName: 'Имя', minWidth: 150, flex: 1, renderCell: renderFioCell },
        { field: 'Patronymic', headerName: 'Отчество', minWidth: 150, flex: 1, renderCell: renderFioCell },
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
            renderCell: (params: GridRenderCellParams<RowData>) => ( // Кнопка удаления внутри ячейки
                <form className="font-for-headers" onSubmit={() => DeleteFirstSemesterPlanSubmit(
                    params.row.CallNumber,
                    params.row.NameLesson,
                    params.row.NameGroup,
                    params.row.TimeForLesson,
                    params.row.NumberHourInWeek
                )}>
                    <button type="submit" className="btn btn-warning text-light">Удалить</button>
                </form>
            ),
            flex: 1
        }
    ];// Создаем тему шрифта Vollda
    const columnsSecondSemester = [
        { field: 'ID', headerName: '№', minWidth: 50, flex: 1 },
        { field: 'Lastname', headerName: 'Фамилия', minWidth: 150, flex: 1, renderCell: renderFioCell },
        { field: 'Firstname', headerName: 'Имя', minWidth: 150, flex: 1, renderCell: renderFioCell },
        { field: 'Patronymic', headerName: 'Отчество', minWidth: 150, flex: 1, renderCell: renderFioCell },
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
            renderCell: (params: GridRenderCellParams<RowData>) => ( // Кнопка удаления внутри ячейки
                <form className="font-for-headers" onSubmit={() => DeleteSecondSemesterPlanSubmit(
                    params.row.CallNumber,
                    params.row.NameLesson,
                    params.row.NameGroup,
                    params.row.TimeForLesson,
                    params.row.NumberHourInWeek
                )}>
                    <button type="submit" className="btn btn-warning text-light">Удалить</button>
                </form>
            ),
            flex: 1
        }
    ];// Создаем тему шрифта Vollda
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
                            rows={cachedRowsFirst}
                            columns={columnsFirstSemester}
                            getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                            showToolbar
                            className="mt-2 font-for-headers"
                            hideFooter
                            disableColumnFilter
                            disableColumnSelector
                            disableColumnMenu
                            label={namegroups || ''}
                            localeText={localization.ruForPlan}
                                sx={{

                                    "& .MuiDataGrid-row.Mui-selected": { // Новый блок для выделения строки
                                        backgroundColor: "inherit !important"
                                    },
                                    "& .MuiDataGrid-row": {
                                        backgroundColor: "inherit",
                                        outlineColor: "white" // Or 'transparent' or whatever color you'd like
                                    },
                                    "& .MuiDataGrid-columnHeader":
                                    {
                                        backgroundColor: '#fff', // Цвет фона заголовка колонки
                                        color: '#000',              // Цвет шрифта
                                        outlineColor: "white",
                                        height: "unset !important"
                                    },
                                    color: "#fff",
                                    backgroundColor: "#000",
                                    outlineColor: "white",
                                    "& .MuiOutlinedInput-root": {
                                        color: "#fff",
                                        fieldset: {
                                            borderColor: "white !important",
                                            color: "#fff",
                                        },
                                        ":hover fieldset": {
                                            borderColor: "white",
                                            color: "#fff",
                                        },
                                        ".Mui-focused fieldset": {
                                            borderColor: "#fff",
                                            color: "#fff",
                                        },
                                    },
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
                                rows={cachedRowsSecond}
                                columns={columnsSecondSemester}
                                getRowId={(row) => row.ID} // Временный идентификатор, основанный на индексе массива
                                showToolbar
                                className="mt-2 font-for-headers"
                                hideFooter
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnMenu
                                label={namegroups || ''}
                                localeText={localization.ruForPlan}
                                sx={{
                                    color: "#fff",
                                    backgroundColor: "#000",
                                    outlineColor: "white",
                                    "& .MuiDataGrid-row.Mui-selected": { // Новый блок для выделения строки
                                        backgroundColor: "inherit !important"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        color: "#fff",
                                        fieldset: {
                                            borderColor: "white !important",
                                            color: "#fff",
                                        },
                                        ":hover fieldset": {
                                            borderColor: "white",
                                            color: "#fff",
                                        },
                                        ".Mui-focused fieldset": {
                                            borderColor: "#fff",
                                            color: "#fff",
                                        },
                                    },
                                    "& .MuiDataGrid-columnHeader":
                                    {
                                        backgroundColor: '#fff', // Цвет фона заголовка колонки
                                        color: '#000',              // Цвет шрифта
                                        outlineColor: "white",
                                        height: "unset !important"
                                    },
                                    "& .MuiDataGrid-row": {
                                        backgroundColor: "inherit",
                                        outlineColor: "white" // Or 'transparent' or whatever color you'd like
                                    },
                                    "& .MuiDataGrid-row:hover": {
                                        backgroundColor: "inherit" // Or 'transparent' or whatever color you'd like
                                    },
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
