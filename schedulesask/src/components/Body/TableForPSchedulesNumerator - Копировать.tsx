import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DateColumns, WeekColumns } from '../../utils/Date/DateSettings';
import { PScheduleNumerator } from '../../utils/DataForTable/PScheduleSettingsNumerator';
import { GetNamegroup } from '../../utils/db/get/GetNameGroup';
import { calculateSemester } from '../../utils/Date/CalculateSemester';

const tableStyles = {
    fontFamily: "'Vollda'",
    fontSize: '1rem',
    fontWeight: 'normal',
};
interface Data {
    Number: number;
    Time: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
}
function createData(
    Number: number,
    Time: string,
    Monday: string,
    Tuesday: string,
    Wednesday: string,
    Thursday: string,
    Friday: string,
    Saturday: string,
    Sunday: string,
): Data {
    return { Number, Time, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
}
export default function TableForPSchedulesNumerator() {

    const rowsNumerator = [
        createData(1, '8.00-9.30', PScheduleNumerator(1, "Понедельник"), PScheduleNumerator(1, "Вторник"), PScheduleNumerator(1, "Среда"), PScheduleNumerator(1, "Четверг"), PScheduleNumerator(1, "Пятница"), PScheduleNumerator(1, "Суббота"), 'Выходной'),
        createData(2, '9.40-11.10', PScheduleNumerator(2, "Понедельник"), PScheduleNumerator(2, "Вторник"), PScheduleNumerator(2, "Среда"), PScheduleNumerator(2, "Четверг"), PScheduleNumerator(2, "Пятница"), PScheduleNumerator(2, "Суббота"), 'Выходной'),
        createData(3, '11.30-13.00', PScheduleNumerator(3, "Понедельник"), PScheduleNumerator(3, "Вторник"), PScheduleNumerator(3, "Среда"), PScheduleNumerator(3, "Четверг"), PScheduleNumerator(3, "Пятница"), PScheduleNumerator(3, "Суббота"), 'Выходной'),
        createData(4, '13.10-14.40', PScheduleNumerator(4, "Понедельник"), PScheduleNumerator(4, "Вторник"), PScheduleNumerator(4, "Среда"), PScheduleNumerator(4, "Четверг"), PScheduleNumerator(4, "Пятница"), PScheduleNumerator(4, "Суббота"), 'Выходной'),
        createData(5, '14.50-16.20', PScheduleNumerator(5, "Понедельник"), PScheduleNumerator(5, "Вторник"), PScheduleNumerator(5, "Среда"), PScheduleNumerator(5, "Четверг"), PScheduleNumerator(5, "Пятница"), PScheduleNumerator(5, "Суббота"), 'Выходной'),
        createData(6, '16.30-18.00', PScheduleNumerator(6, "Понедельник"), PScheduleNumerator(6, "Вторник"), PScheduleNumerator(6, "Среда"), PScheduleNumerator(6, "Четверг"), PScheduleNumerator(6, "Пятница"), PScheduleNumerator(6, "Суббота"), 'Выходной'),
        createData(7, '18.10-19.40', PScheduleNumerator(7, "Понедельник"), PScheduleNumerator(7, "Вторник"), PScheduleNumerator(7, "Среда"), PScheduleNumerator(7, "Четверг"), PScheduleNumerator(7, "Пятница"), PScheduleNumerator(7, "Суббота"), 'Выходной'),
    ];
    const { dataGroupName } = GetNamegroup();
    const { semester } = calculateSemester()
    const nameGroup = dataGroupName.length > 0 ? dataGroupName[0].NameGroup : null;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (
        <>
            <h1 className='mt-3 text-center'>{nameGroup}</h1>
            <h2 className="mt-3">{semester}</h2>
            <h2 className="mt-3">Числитель</h2>
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

                        {/* Второй фиксированный заголовок */}
                        <TableHead>
                            <TableRow style={{ position: 'sticky', top: 48, backgroundColor: '#fff', zIndex: 3 }}>
                                {WeekColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth, backgroundColor: column.Background,
                                            color: column.Color
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rowsNumerator
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {WeekColumns.map((column, cellIndex) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell  className='table-cell-break' key={column.id} align={column.align} style={{
                                                        backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 ? '#000' : undefined),
                                                        color: cellIndex < 2 ? '#fff' : undefined,
                                                        position: cellIndex === 0 ? 'sticky' : 'static',
                                                        left: cellIndex === 0 ? '0' : (cellIndex === 1 ? '0' : undefined),
                                                        zIndex: cellIndex === 0 ? 1 : (cellIndex === 1 ? 0 : undefined)
                                                    }} >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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
            <h2 className="mt-3">Знаменатель</h2>
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

                        {/* Второй фиксированный заголовок */}
                        <TableHead>
                            <TableRow style={{ position: 'sticky', top: 48, backgroundColor: '#fff', zIndex: 3 }}>
                                {WeekColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth, backgroundColor: column.Background,
                                            color: column.Color
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rowsNumerator
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {WeekColumns.map((column, cellIndex) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell className='table-cell-break' key={column.id} align={column.align} style={{
                                                        backgroundColor: cellIndex === 1 ? '#ffc107' : (cellIndex === 0 ? '#000' : undefined),
                                                        color: cellIndex < 2 ? '#fff' : undefined,
                                                        position: cellIndex === 0 ? 'sticky' : 'static',
                                                        left: cellIndex === 0 ? '0' : (cellIndex === 1 ? '0' : undefined),
                                                        zIndex: cellIndex === 0 ? 1 : (cellIndex === 1 ? 0 : undefined)
                                                    }} >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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
    );
}
