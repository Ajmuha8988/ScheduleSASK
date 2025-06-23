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
import { WeekColumns, DateColumns } from '../../utils/Date/DateSettings';
import { StudentScheduleSettings } from '../../utils/DataForTable/StudentScheduleSettings';
import { GetStudentNamegroup } from '../../utils/db/get/GetStudentNameGroup';
import { calculateSemester } from '../../utils/Date/CalculateSemester';
import CircularProgress from '@mui/material/CircularProgress';
import PopupState, { bindMenu } from 'material-ui-popup-state';
import determineWeekType from '../../utils/Date/CalculateDivined'
import { GetStartSecondSemester } from '../../utils/db/get/GetStartSecondSemester'
import ScheduleFooter from '../Footer/ScheduleFooter';
import getAcademicWeek from '../../utils/Date/CalculateFirstSemester'

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
export default function TableForStudentsSchedules() {
    const { dataSSS } = GetStartSecondSemester();
    const today = new Date();
    const currentDate = dataSSS.length > 0 ? dataSSS[0].DateSecondSemester : '';
    const secondSemesterStart = new Date(currentDate);
    const kindOfSchedules = determineWeekType(secondSemesterStart, today);
    const firstkindOfSchedules = getAcademicWeek(today);
    let rowsTSchedule = [
        createData(1, '8.00-9.30', StudentScheduleSettings(1, "Понедельник"), StudentScheduleSettings(1, "Вторник"), StudentScheduleSettings(1, "Среда"), StudentScheduleSettings(1, "Четверг"), StudentScheduleSettings(1, "Пятница"), StudentScheduleSettings(1, "Суббота"), 'Выходной'),
        createData(2, '9.40-11.10', StudentScheduleSettings(2, "Понедельник"), StudentScheduleSettings(2, "Вторник"), StudentScheduleSettings(2, "Среда"), StudentScheduleSettings(2, "Четверг"), StudentScheduleSettings(2, "Пятница"), StudentScheduleSettings(2, "Суббота"), 'Выходной'),
        createData(3, '11.30-13.00', StudentScheduleSettings(3, "Понедельник"), StudentScheduleSettings(3, "Вторник"), StudentScheduleSettings(3, "Среда"), StudentScheduleSettings(3, "Четверг"), StudentScheduleSettings(3, "Пятница"), StudentScheduleSettings(3, "Суббота"), 'Выходной'),
        createData(4, '13.10-14.40', StudentScheduleSettings(4, "Понедельник"), StudentScheduleSettings(4, "Вторник"), StudentScheduleSettings(4, "Среда"), StudentScheduleSettings(4, "Четверг"), StudentScheduleSettings(4, "Пятница"), StudentScheduleSettings(4, "Суббота"), 'Выходной'),
        createData(5, '14.50-16.20', StudentScheduleSettings(5, "Понедельник"), StudentScheduleSettings(5, "Вторник"), StudentScheduleSettings(5, "Среда"), StudentScheduleSettings(5, "Четверг"), StudentScheduleSettings(5, "Пятница"), StudentScheduleSettings(5, "Суббота"), 'Выходной'),
        createData(6, '16.30-18.00', StudentScheduleSettings(6, "Понедельник"), StudentScheduleSettings(6, "Вторник"), StudentScheduleSettings(6, "Среда"), StudentScheduleSettings(6, "Четверг"), StudentScheduleSettings(6, "Пятница"), StudentScheduleSettings(6, "Суббота"), 'Выходной'),
        createData(7, '18.10-19.40', StudentScheduleSettings(7, "Понедельник"), StudentScheduleSettings(7, "Вторник"), StudentScheduleSettings(7, "Среда"), StudentScheduleSettings(7, "Четверг"), StudentScheduleSettings(7, "Пятница"), StudentScheduleSettings(7, "Суббота"), 'Выходной'),
    ];
    const { dataGroupName } = GetStudentNamegroup();
    const { semester } = calculateSemester();
    if (semester === '2-ой семестр') {
        rowsTSchedule = [
            createData(1, '8.00-9.30', StudentScheduleSettings(1, "Понедельник"), StudentScheduleSettings(1, "Вторник"), StudentScheduleSettings(1, "Среда"), StudentScheduleSettings(1, "Четверг"), StudentScheduleSettings(1, "Пятница"), 'Выходной', 'Выходной'),
            createData(2, '9.40-11.10', StudentScheduleSettings(2, "Понедельник"), StudentScheduleSettings(2, "Вторник"), StudentScheduleSettings(2, "Среда"), StudentScheduleSettings(2, "Четверг"), StudentScheduleSettings(2, "Пятница"), 'Выходной', 'Выходной'),
            createData(3, '11.30-13.00', StudentScheduleSettings(3, "Понедельник"), StudentScheduleSettings(3, "Вторник"), StudentScheduleSettings(3, "Среда"), StudentScheduleSettings(3, "Четверг"), StudentScheduleSettings(3, "Пятница"), 'Выходной', 'Выходной'),
            createData(4, '13.10-14.40', StudentScheduleSettings(4, "Понедельник"), StudentScheduleSettings(4, "Вторник"), StudentScheduleSettings(4, "Среда"), StudentScheduleSettings(4, "Четверг"), StudentScheduleSettings(4, "Пятница"), 'Выходной', 'Выходной'),
            createData(5, '14.50-16.20', StudentScheduleSettings(5, "Понедельник"), StudentScheduleSettings(5, "Вторник"), StudentScheduleSettings(5, "Среда"), StudentScheduleSettings(5, "Четверг"), StudentScheduleSettings(5, "Пятница"), 'Выходной', 'Выходной'),
            createData(6, '16.30-18.00', StudentScheduleSettings(6, "Понедельник"), StudentScheduleSettings(6, "Вторник"), StudentScheduleSettings(6, "Среда"), StudentScheduleSettings(6, "Четверг"), StudentScheduleSettings(6, "Пятница"), 'Выходной', 'Выходной'),
            createData(7, '18.10-19.40', StudentScheduleSettings(7, "Понедельник"), StudentScheduleSettings(7, "Вторник"), StudentScheduleSettings(7, "Среда"), StudentScheduleSettings(7, "Четверг"), StudentScheduleSettings(7, "Пятница"), 'Выходной', 'Выходной'),
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

            {StudentScheduleSettings(1, "Понедельник") === true ? (
                <div className="text-center mt-5">
                    <CircularProgress color="inherit" />
                </div >
            ) : (
              <>
                <body className='container font-for-headers content'>
                            <h1 className='mt-3 text-center'>{nameGroup === null ? (
                                <>
                                    Вас не добавили в учебную группу,<br />
                                    пожалуйста, обратитесь к своему преподавателю
                                </>
                            ) : nameGroup}</h1>
                    <h2 className="mt-3">{semester}</h2>
                    {semester === '2-ой семестр' ? (
                        <>
                            <h2>{kindOfSchedules}</h2>
                            <Paper className='mt-3' sx={{ width: '100%', borderRadius: 1 }}>
                                <TableContainer sx={{
                                    maxHeight: 640, "& .MuiTableCell-root": {
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
                                                                let colorValue;
                                                                let displayedTT;
                                                                if (Array.isArray(value)) {
                                                                    displayedValue = value.length > 0 ? value[0].dataForTable : '';
                                                                    displayedTwoValue = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueSecond = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueThird = value.length > 0 ? value[0].about : '';
                                                                    colorValue = value.length > 0 ? value[0].color : '';
                                                                    displayedTT = value.length > 0 ? value[0].dataForTTable : '';
                                                                } else {
                                                                    displayedValue = value as any; // Если это не массив, оставляем как есть
                                                                    displayedTT = null;
                                                                    colorValue = null;
                                                                    displayedTwoValue = null;
                                                                    displayedValueSecond = null;
                                                                    displayedValueThird = null;
                                                                }
                                                                return (
                                                                    <TableCell
                                                                        className='table-cell-break' key={column.id} align={column.align} style={{
                                                                            backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 || colorValue === 'black' ? '#000' : undefined),
                                                                            color: cellIndex < 2 || colorValue === 'black' ? '#fff' : undefined,
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
                                                                                                {displayedTT === '' ? displayedValue : displayedTT}
                                                                                            </p>
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
                            <h2>{firstkindOfSchedules}</h2>
                            <Paper className='mt-3' sx={{ width: '100%', borderRadius: 1 }}>
                                <TableContainer sx={{
                                        maxHeight: 640, "& .MuiTableCell-root": {
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
                                                                let colorValue;
                                                                let displayedTT;
                                                                if (Array.isArray(value)) {
                                                                    displayedValue = value.length > 0 ? value[0].dataForTable : '';
                                                                    displayedTwoValue = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueSecond = value.length > 1 ? value[1].dataForTable : '';
                                                                    displayedValueThird = value.length > 0 ? value[0].about : '';
                                                                    colorValue = value.length > 0 ? value[0].color : '';
                                                                    displayedTT = value.length > 0 ? value[0].dataForTTable : '';
                                                                } else {
                                                                    displayedValue = value as any; // Если это не массив, оставляем как есть
                                                                    colorValue = null;
                                                                    displayedTT = null;
                                                                    displayedTwoValue = null;
                                                                    displayedValueSecond = null;
                                                                    displayedValueThird = null;
                                                                }
                                                                return (
                                                                    <TableCell
                                                                        className='table-cell-break' key={column.id} align={column.align} style={{
                                                                            backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 || colorValue === 'black' ? '#000' : undefined),
                                                                            color: cellIndex < 2 || colorValue === 'black' ? '#fff' : undefined,
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
                                                                                                {displayedTT === '' ? displayedValue : displayedTT}
                                                                                            </p>
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
                                                                                                { displayedValue }
                                                                                            </p>
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
                </body>
                <ScheduleFooter></ScheduleFooter>
              </>
            )}
        </>
    );
}
