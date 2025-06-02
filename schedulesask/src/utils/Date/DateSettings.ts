// Функция для получения массива дней текущей недели
const getWeekDays = () => {
    const today = new Date(); // Сегодняшняя дата

    // Определение начала недели (понедельник)
    let startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() || 7) - 1));

    // Массив для хранения дней недели
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek); // Клонируем начало недели
        date.setDate(date.getDate() + i); // Добавляем нужное количество дней

        // Форматируем дату в нужный вид (dd/mm/yyyy)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        weekDays.push(`${day}/${month}/${year}`);
    }

    return weekDays;
};
export default getWeekDays;

//export const DateColumns = [
//    { id: 'Data', label: 'Дата', minWidth: 150, align: 'right', colSpan: 2, Background: '#ffc107', Color: '#fff' },
//    { id: 'DataMonday', label: getWeekDays()[0], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataTuesday', label: getWeekDays()[1], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataWednesday', label: getWeekDays()[2], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataThursday', label: getWeekDays()[3], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataFriday', label: getWeekDays()[4], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataSaturday', label: getWeekDays()[5], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//    { id: 'DataSunday', label: getWeekDays()[6], minWidth: 100, Background: '#000', Color: '#fff', align: 'center' },
//];
export const WeekColumns = [
    { id: 'Number', label: '№', minWidth: 50, align: 'left', Background: '#000', Color: '#fff' },
    { id: 'Time', label: 'Время', minWidth: 200, align: 'left', Background: '#000', Color: '#fff' },
    { id: 'Monday', label: 'Понедельник', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Tuesday', label: 'Вторник', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Wednesday', label: 'Среда', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Thursday', label: 'Четверг', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Friday', label: 'Пятница', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Saturday', label: 'Суббота', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
    { id: 'Sunday', label: 'Воскресенье', minWidth: 200, Background: '#ffc107', Color: '#fff', align: 'center' },
];