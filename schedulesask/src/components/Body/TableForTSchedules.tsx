import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { WeekColumns, DateColumns } from '../../utils/Date/DateSettings';
import { TScheduleSettings } from '../../utils/DataForTable/TScheduleSettings';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
import { calculateSemester } from '../../utils/Date/CalculateSemester';
import CircularProgress from '@mui/material/CircularProgress';
import PopupState, { bindMenu } from 'material-ui-popup-state';
import { DeletePScheduleService } from '../../utils/db/delete/deletePSchedule';
import determineWeekType from '../../utils/Date/CalculateDivined'
import { GetStartSecondSemester } from '../../utils/db/get/GetStartSecondSemester'


const tableStyles = {
    fontFamily: "'Vollda'",
    fontSize: '1rem',
    fontWeight: 'normal',
};
interface MousePosition {
    x: number | null;
    y: number | null;
}
type LessonObject = {
    dataForTable: string;
    NameLessons?: string;
    about?: string;
    other?: string;
};
type LessonArrayOrSingle =
    | LessonObject[]
    | LessonObject
    | string
    | null
    | boolean;
interface Data {
    Number: number;
    Time: string;
    Monday: LessonArrayOrSingle;
    Tuesday: LessonArrayOrSingle;
    Wednesday: LessonArrayOrSingle;
    Thursday: LessonArrayOrSingle;
    Friday: LessonArrayOrSingle;
    Saturday: LessonArrayOrSingle;
    Sunday: LessonArrayOrSingle;
    [key: string]: unknown; // добавляем индексную сигнатуру
}
function createData(
    Number: number,
    Time: string,
    Monday: LessonArrayOrSingle,
    Tuesday: LessonArrayOrSingle,
    Wednesday: LessonArrayOrSingle,
    Thursday: LessonArrayOrSingle,
    Friday: LessonArrayOrSingle,
    Saturday: LessonArrayOrSingle,
    Sunday: LessonArrayOrSingle,
): Data {
    return { Number, Time, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
}
export default function TableForTSchedules() {
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
    const secondSemesterStart = new Date(currentDate);
    const kindOfSchedules = determineWeekType(secondSemesterStart, today);
    let rowsTSchedule = [
        createData(1, '8.00-9.30', TScheduleSettings(1, "Понедельник"), TScheduleSettings(1, "Вторник"), TScheduleSettings(1, "Среда"), TScheduleSettings(1, "Четверг"), TScheduleSettings(1, "Пятница"), TScheduleSettings(1, "Суббота"), 'Выходной'),
        createData(2, '9.40-11.10', TScheduleSettings(2, "Понедельник"), TScheduleSettings(2, "Вторник"), TScheduleSettings(2, "Среда"), TScheduleSettings(2, "Четверг"), TScheduleSettings(2, "Пятница"), TScheduleSettings(2, "Суббота"), 'Выходной'),
        createData(3, '11.30-13.00', TScheduleSettings(3, "Понедельник"), TScheduleSettings(3, "Вторник"), TScheduleSettings(3, "Среда"), TScheduleSettings(3, "Четверг"), TScheduleSettings(3, "Пятница"), TScheduleSettings(3, "Суббота"), 'Выходной'),
        createData(4, '13.10-14.40', TScheduleSettings(4, "Понедельник"), TScheduleSettings(4, "Вторник"), TScheduleSettings(4, "Среда"), TScheduleSettings(4, "Четверг"), TScheduleSettings(4, "Пятница"), TScheduleSettings(4, "Суббота"), 'Выходной'),
        createData(5, '14.50-16.20', TScheduleSettings(5, "Понедельник"), TScheduleSettings(5, "Вторник"), TScheduleSettings(5, "Среда"), TScheduleSettings(5, "Четверг"), TScheduleSettings(5, "Пятница"), TScheduleSettings(5, "Суббота"), 'Выходной'),
        createData(6, '16.30-18.00', TScheduleSettings(6, "Понедельник"), TScheduleSettings(6, "Вторник"), TScheduleSettings(6, "Среда"), TScheduleSettings(6, "Четверг"), TScheduleSettings(6, "Пятница"), TScheduleSettings(6, "Суббота"), 'Выходной'),
        createData(7, '18.10-19.40', TScheduleSettings(7, "Понедельник"), TScheduleSettings(7, "Вторник"), TScheduleSettings(7, "Среда"), TScheduleSettings(7, "Четверг"), TScheduleSettings(7, "Пятница"), TScheduleSettings(7, "Суббота"), 'Выходной'),
    ];
    const { dataGroupName } = GetNamegroup();
    const { semester } = calculateSemester();
    if (semester === '2-ой семестр') {
        rowsTSchedule = [
            createData(1, '8.00-9.30', TScheduleSettings(1, "Понедельник"), TScheduleSettings(1, "Вторник"), TScheduleSettings(1, "Среда"), TScheduleSettings(1, "Четверг"), TScheduleSettings(1, "Пятница"), 'Выходной', 'Выходной'),
            createData(2, '9.40-11.10', TScheduleSettings(2, "Понедельник"), TScheduleSettings(2, "Вторник"), TScheduleSettings(2, "Среда"), TScheduleSettings(2, "Четверг"), TScheduleSettings(2, "Пятница"), 'Выходной', 'Выходной'),
            createData(3, '11.30-13.00', TScheduleSettings(3, "Понедельник"), TScheduleSettings(3, "Вторник"), TScheduleSettings(3, "Среда"), TScheduleSettings(3, "Четверг"), TScheduleSettings(3, "Пятница"), 'Выходной', 'Выходной'),
            createData(4, '13.10-14.40', TScheduleSettings(4, "Понедельник"), TScheduleSettings(4, "Вторник"), TScheduleSettings(4, "Среда"), TScheduleSettings(4, "Четверг"), TScheduleSettings(4, "Пятница"), 'Выходной', 'Выходной'),
            createData(5, '14.50-16.20', TScheduleSettings(5, "Понедельник"), TScheduleSettings(5, "Вторник"), TScheduleSettings(5, "Среда"), TScheduleSettings(5, "Четверг"), TScheduleSettings(5, "Пятница"), 'Выходной', 'Выходной'),
            createData(6, '16.30-18.00', TScheduleSettings(6, "Понедельник"), TScheduleSettings(6, "Вторник"), TScheduleSettings(6, "Среда"), TScheduleSettings(6, "Четверг"), TScheduleSettings(6, "Пятница"), 'Выходной', 'Выходной'),
            createData(7, '18.10-19.40', TScheduleSettings(7, "Понедельник"), TScheduleSettings(7, "Вторник"), TScheduleSettings(7, "Среда"), TScheduleSettings(7, "Четверг"), TScheduleSettings(7, "Пятница"), 'Выходной', 'Выходной'),
        ];

    } else if (semester === 'Каникулы') {
        rowsTSchedule = [
            createData(1, '8.00-9.30', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(2, '9.40-11.10', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(3, '11.30-13.00', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(4, '13.10-14.40', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(5, '14.50-16.20', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(6, '16.30-18.00', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
            createData(7, '18.10-19.40', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы', 'Каникулы'),
        ];
    }
    const { deletePScheduleMember } = DeletePScheduleService()
    const deletePScheduleSubmit = async (nameLesson: bigint) => {
        if (event) {
            event.preventDefault();
        }
        try {
            await deletePScheduleMember({
                ID_PSchedule: nameLesson
            });
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                console.log(String(error))
            }
        }

    };
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    const [mousePosition, setMousePosition] = React.useState<MousePosition>({
        x: null,
        y: null
    });
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLParagraphElement>) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };
    return (
        <>

            {TScheduleSettings(1, "Понедельник") === true ? (
                <div className="text-center mt-5">
                    <CircularProgress color="inherit" />
                </div >
            ) : (
                <>
                    <h1 className='mt-3 text-center'>{nameGroup}</h1>
                    <h2 className="mt-3">{semester}</h2>
                    <h2>{kindOfSchedules}</h2>
                    {semester === '2-ой семестр' ? (
                        <>
                            <Paper className='mt-3' sx={{ width: '100%', borderRadius: 1 }}>
                                <TableContainer sx={{
                                    maxHeight: 440, "& .MuiTableCell-root": {
                                        border: "1px solid rgba(255, 255, 255, 0.8)",
                                        ...tableStyles,
                                        borderRadius: 1,
                                    },
                                }}>
                                    <Table stickyHeader>
                                         <TableHead>
                                                <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#fafafa', zIndex: 2 }}>
                                                    {DateColumns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{
                                                                minWidth: column.minWidth, backgroundColor: column.Background,
                                                                color: column.Color
                                                            }}
                                                            colSpan={column.colSpan}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                        </TableHead>
                                        <TableHead>
                                            <TableRow style={{ position: 'sticky', top: 48, backgroundColor: '#fafafa', zIndex: 3 }}>
                                                {WeekColumns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth, backgroundColor: column.Background,
                                                            color: column.Color,
                                                            maxWidth: 300,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rowsTSchedule
                                                .map(row => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                                            {WeekColumns.map((column, cellIndex) => {
                                                                const value = row[column.id];
                                                                let displayedValue;
                                                                let displayedValueSecond;
                                                                let displayedTwoValue;
                                                                let displayedValueThird;
                                                                let displayedValueForDelete;
                                                                let displayedTwoValueForDelete;
                                                                let displayedOtherValueForDelete;
                                                                if (Array.isArray(value)) {
                                                                    displayedValue = value.length > 0 ? value[0].dataForTable : '';
                                                                    displayedTwoValue = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueSecond = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedTwoValueForDelete = value.length > 1 ? value[1].NameLessons : '';
                                                                    displayedValueForDelete = value.length > 0 ? value[0].NameLessons : '';
                                                                    displayedOtherValueForDelete = value.length > 0 ? value[0].other : '';
                                                                    displayedValueThird = value.length > 0 ? value[0].about : '';
                                                                } else {
                                                                    displayedValue = value as any; // Если это не массив, оставляем как есть
                                                                    displayedTwoValue = null;
                                                                    displayedOtherValueForDelete = null;
                                                                    displayedValueSecond = null;
                                                                    displayedValueThird = null;
                                                                    displayedValueForDelete = null;
                                                                    displayedTwoValueForDelete = null;
                                                                }
                                                                return (
                                                                    <TableCell
                                                                        className='table-cell-break' key={column.id} align={column.align} style={{
                                                                            backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 ? '#000' : undefined),
                                                                            color: cellIndex < 2 ? '#fff' : undefined,
                                                                            position: cellIndex === 0 ? 'sticky' : 'static',
                                                                            left: cellIndex === 0 ? '0' : (cellIndex === 1 ? '0' : undefined),
                                                                            zIndex: cellIndex === 0 ? 1 : (cellIndex === 1 ? 0 : undefined)
                                                                        }} >
                                                                        <a style={{
                                                                            display: cellIndex < 2 || cellIndex === 7 || cellIndex === 8 ? 'block' : 'none',
                                                                        }} >
                                                                            {displayedValue}
                                                                        </a>
                                                                        {displayedTwoValue ? (

                                                                            <div className={
                                                                                // Изменяем класс в зависимости от условия
                                                                                `${Array.isArray(value) && value.length === 2 ? 'block' : 'none'}`}>
                                                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                                {(popupStateForTwo) => (
                                                                                                    <React.Fragment>
                                                                                                        <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                                                                            <IconButton style={{
                                                                                                                marginLeft: 'auto',
                                                                                                                display: cellIndex > 1 && cellIndex < 7 && (displayedValue === null || displayedValue !== '') && Array.isArray(value) && value.length === 2 ? 'block' : 'none',
                                                                                                                position: 'relative', top: '-15px', left: '15px'
                                                                                                            }} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                                                                                handleClick(event); // Передаем событие в handleClick
                                                                                                                popupStateForTwo.open(event.currentTarget);
                                                                                                            }}
                                                                                                            >
                                                                                                                <InfoOutlineIcon style={{
                                                                                                                    display: cellIndex > 1 && cellIndex < 7 && (displayedValue === null || displayedValue !== '') && Array.isArray(value) && value.length === 2 ? 'block' : 'none',
                                                                                                                }}></InfoOutlineIcon>
                                                                                                            </IconButton>
                                                                                                            <Menu  {...bindMenu(popupStateForTwo)}
                                                                                                                anchorReference="anchorPosition"
                                                                                                                anchorPosition={{
                                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                                }}>
                                                                                                                <TableCell className='table-cell-break' sx={{
                                                                                                                    fontFamily: "'Vollda'",
                                                                                                                    fontSize: '1rem',
                                                                                                                    fontWeight: 'normal',
                                                                                                                }} key={column.id} align={column.align}>
                                                                                                                    <p>{displayedValueSecond}</p>
                                                                                                                </TableCell>
                                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedTwoValueForDelete)} sx={{
                                                                                                                    fontFamily: "'Vollda'"
                                                                                                                }}>Удалить</MenuItem>
                                                                                                            </Menu>
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )}
                                                                                            </PopupState>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 7 ? 'block' : 'none', position: 'relative', top: '-20px',
                                                                                            }} onClick={(event: React.MouseEvent<HTMLParagraphElement>) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedTwoValue}
                                                                                            </p>
                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>
                                                                            </div>
                                                                        ) : ((displayedValue !== 'Нет занятий') ? (
                                                                            (displayedValueThird === null || displayedValueThird === '' || displayedValueThird.trim().length === 0)
                                                                                ? (<PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 7 ? 'block' : 'none',
                                                                                            }} onClick={(event) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedValue}
                                                                                            </p>

                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>) : (<PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                                {(popupStateForTwo) => (
                                                                                                    <React.Fragment>
                                                                                                        <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                                                                            <IconButton style={{
                                                                                                                marginLeft: 'auto',
                                                                                                                display: cellIndex > 1 && cellIndex < 7 && displayedValueThird !== '' ? 'block' : 'none',
                                                                                                                position: 'relative', top: '-15px', left: '15px'
                                                                                                            }} onClick={(event) => {
                                                                                                                handleClick(event);
                                                                                                                popupStateForTwo.open(event.currentTarget);
                                                                                                            }}>
                                                                                                                <InfoOutlineIcon style={{
                                                                                                                    display: cellIndex > 1 && cellIndex < 7 && displayedValueThird !== '' ? 'block' : 'none',
                                                                                                                }}></InfoOutlineIcon>
                                                                                                            </IconButton>
                                                                                                            <Menu  {...bindMenu(popupStateForTwo)}
                                                                                                                anchorReference="anchorPosition"
                                                                                                                anchorPosition={{
                                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                                }}>
                                                                                                                <TableCell className='table-cell-break' sx={{
                                                                                                                    fontFamily: "'Vollda'",
                                                                                                                    fontSize: '1rem',
                                                                                                                    fontWeight: 'normal',
                                                                                                                }} key={column.id} align={column.align}>
                                                                                                                    <p>{displayedValueThird}</p>
                                                                                                                </TableCell>
                                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedOtherValueForDelete)} sx={{
                                                                                                                    fontFamily: "'Vollda'"
                                                                                                                }}>Удалить</MenuItem>
                                                                                                            </Menu>
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )}
                                                                                            </PopupState>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 7 ? 'block' : 'none', position: 'relative', top: '-20px',
                                                                                            }} onClick={(event) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedValue}
                                                                                            </p>
                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>
                                                                                )
                                                                        ) : (
                                                                            <>
                                                                                {displayedValue}
                                                                            </>
                                                                        )
                                                                        )}

                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </>
                    ) : (
                        <>
                            <Paper className='mt-3' sx={{ width: '100%', borderRadius: 1 }}>
                                <TableContainer sx={{
                                    maxHeight: 440, "& .MuiTableCell-root": {
                                        border: "1px solid rgba(255, 255, 255, 0.8)",
                                        ...tableStyles,
                                        borderRadius: 1,
                                    },
                                }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                                <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#fafafa', zIndex: 2 }}>
                                                    {DateColumns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{
                                                                minWidth: column.minWidth, backgroundColor: column.Background,
                                                                color: column.Color
                                                            }}
                                                            colSpan={column.colSpan}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                        </TableHead>
                                        <TableHead>
                                            <TableRow style={{ position: 'sticky', top: 48, backgroundColor: '#fafafa', zIndex: 3 }}>
                                                {WeekColumns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth, backgroundColor: column.Background,
                                                            color: column.Color,
                                                            maxWidth: 300,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rowsTSchedule
                                                .map(row => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                                            {WeekColumns.map((column, cellIndex) => {
                                                                const value = row[column.id];
                                                                let displayedValue;
                                                                let displayedValueSecond;
                                                                let displayedTwoValue;
                                                                let displayedValueThird;
                                                                let displayedValueForDelete;
                                                                let displayedTwoValueForDelete;
                                                                let displayedOtherValueForDelete;
                                                                if (Array.isArray(value)) {
                                                                    displayedValue = value.length > 0 ? value[0].dataForTable : '';
                                                                    displayedTwoValue = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueSecond = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedTwoValueForDelete = value.length > 1 ? value[1].NameLessons : '';
                                                                    displayedValueForDelete = value.length > 0 ? value[0].NameLessons : '';
                                                                    displayedOtherValueForDelete = value.length > 0 ? value[0].other : '';
                                                                    displayedValueThird = value.length > 0 ? value[0].about : '';
                                                                } else {
                                                                    displayedValue = value as any; // Если это не массив, оставляем как есть
                                                                    displayedTwoValue = null;
                                                                    displayedOtherValueForDelete = null;
                                                                    displayedValueSecond = null;
                                                                    displayedValueThird = null;
                                                                    displayedValueForDelete = null;
                                                                    displayedTwoValueForDelete = null;
                                                                }
                                                                return (
                                                                    <TableCell
                                                                        className='table-cell-break' key={column.id} align={column.align} style={{
                                                                            backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 ? '#000' : undefined),
                                                                            color: cellIndex < 2 ? '#fff' : undefined,
                                                                            position: cellIndex === 0 ? 'sticky' : 'static',
                                                                            left: cellIndex === 0 ? '0' : (cellIndex === 1 ? '0' : undefined),
                                                                            zIndex: cellIndex === 0 ? 1 : (cellIndex === 1 ? 0 : undefined)
                                                                        }} >
                                                                        <a style={{
                                                                            display: cellIndex < 2 || cellIndex === 8 ? 'block' : 'none',
                                                                        }} >
                                                                            {displayedValue}
                                                                        </a>
                                                                        {displayedTwoValue ? (

                                                                            <div className={
                                                                                // Изменяем класс в зависимости от условия
                                                                                `${Array.isArray(value) && value.length === 2 ? 'block' : 'none'}`}>
                                                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                                {(popupStateForTwo) => (
                                                                                                    <React.Fragment>
                                                                                                        <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                                                                            <IconButton style={{
                                                                                                                marginLeft: 'auto',
                                                                                                                display: cellIndex > 1 && cellIndex < 8 && (displayedValue === null || displayedValue !== '') && Array.isArray(value) && value.length === 2 ? 'block' : 'none',
                                                                                                                position: 'relative', top: '-15px', left: '15px'
                                                                                                            }} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                                                                                handleClick(event); // Передаем событие в handleClick
                                                                                                                popupStateForTwo.open(event.currentTarget);
                                                                                                            }}
                                                                                                            >
                                                                                                                <InfoOutlineIcon style={{
                                                                                                                    display: cellIndex > 1 && cellIndex < 8 && (displayedValue === null || displayedValue !== '') && Array.isArray(value) && value.length === 2 ? 'block' : 'none',
                                                                                                                }}></InfoOutlineIcon>
                                                                                                            </IconButton>
                                                                                                            <Menu  {...bindMenu(popupStateForTwo)}
                                                                                                                anchorReference="anchorPosition"
                                                                                                                anchorPosition={{
                                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                                }}>
                                                                                                                <TableCell className='table-cell-break' sx={{
                                                                                                                    fontFamily: "'Vollda'",
                                                                                                                    fontSize: '1rem',
                                                                                                                    fontWeight: 'normal',
                                                                                                                }} key={column.id} align={column.align}>
                                                                                                                    <p>{displayedValueSecond}</p>
                                                                                                                </TableCell>
                                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedTwoValueForDelete)} sx={{
                                                                                                                    fontFamily: "'Vollda'"
                                                                                                                }}>Удалить</MenuItem>
                                                                                                            </Menu>
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )}
                                                                                            </PopupState>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 8 ? 'block' : 'none', position: 'relative', top: '-20px',
                                                                                            }} onClick={(event: React.MouseEvent<HTMLParagraphElement>) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedTwoValue}
                                                                                            </p>
                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>
                                                                            </div>
                                                                        ) : ((displayedValue !== 'Нет занятий') ? (
                                                                            (displayedValueThird === null || displayedValueThird === '' || displayedValueThird.trim().length === 0)
                                                                                ? (<PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 8 ? 'block' : 'none',
                                                                                            }} onClick={(event) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedValue}
                                                                                            </p>

                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>) : (<PopupState variant="popover" popupId="demo-popup-menu">
                                                                                    {(popupState) => (
                                                                                        <React.Fragment>
                                                                                            <PopupState variant="popover" popupId="demo-popup-menu">
                                                                                                {(popupStateForTwo) => (
                                                                                                    <React.Fragment>
                                                                                                        <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                                                                            <IconButton style={{
                                                                                                                marginLeft: 'auto',
                                                                                                                display: cellIndex > 1 && cellIndex < 8 && displayedValueThird !== '' ? 'block' : 'none',
                                                                                                                position: 'relative', top: '-15px', left: '15px'
                                                                                                            }} onClick={(event) => {
                                                                                                                handleClick(event);
                                                                                                                popupStateForTwo.open(event.currentTarget);
                                                                                                            }}>
                                                                                                                <InfoOutlineIcon style={{
                                                                                                                    display: cellIndex > 1 && cellIndex < 8 && displayedValueThird !== '' ? 'block' : 'none',
                                                                                                                }}></InfoOutlineIcon>
                                                                                                            </IconButton>
                                                                                                            <Menu  {...bindMenu(popupStateForTwo)}
                                                                                                                anchorReference="anchorPosition"
                                                                                                                anchorPosition={{
                                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                                }}>
                                                                                                                <TableCell className='table-cell-break' sx={{
                                                                                                                    fontFamily: "'Vollda'",
                                                                                                                    fontSize: '1rem',
                                                                                                                    fontWeight: 'normal',
                                                                                                                }} key={column.id} align={column.align}>
                                                                                                                    <p>{displayedValueThird}</p>
                                                                                                                </TableCell>
                                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedOtherValueForDelete)} sx={{
                                                                                                                    fontFamily: "'Vollda'"
                                                                                                                }}>Удалить</MenuItem>
                                                                                                            </Menu>
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )}
                                                                                            </PopupState>
                                                                                            <p style={{
                                                                                                display: cellIndex > 1 && cellIndex < 8 ? 'block' : 'none', position: 'relative', top: '-20px',
                                                                                            }} onClick={(event) => {
                                                                                                handleClick(event);
                                                                                                popupState.open(event.currentTarget);
                                                                                            }}>
                                                                                                {displayedValue}
                                                                                            </p>
                                                                                            <Menu  {...bindMenu(popupState)}
                                                                                                anchorReference="anchorPosition"
                                                                                                anchorPosition={{
                                                                                                    top: mousePosition.y ?? 0, left: mousePosition.x ?? 0
                                                                                                }}>
                                                                                                <MenuItem onClick={() => deletePScheduleSubmit(displayedValueForDelete)} sx={{
                                                                                                    fontFamily: "'Vollda'"
                                                                                                }}>Удалить</MenuItem>
                                                                                            </Menu>
                                                                                        </React.Fragment>
                                                                                    )}
                                                                                </PopupState>
                                                                                )
                                                                        ) : (
                                                                            <>
                                                                                {displayedValue}
                                                                            </>
                                                                        )
                                                                        )}

                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </>
                    )}
                </>
            )}
        </>
    );
}
