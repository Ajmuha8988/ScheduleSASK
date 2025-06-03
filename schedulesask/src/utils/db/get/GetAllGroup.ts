import { useState, useEffect } from 'react';
interface Groups {
    NameGroup: string;
    ID_Group: number;
}
// Кастомный хук для получения данных
export const GetAllgroups = () => {
    const [dataGroups, setDataGroups] = useState<Groups[]>([]);
    useEffect(() => {
        fetch('http://localhost:8080/AllGroups')
            .then(response => response.json())
            .then(data => setDataGroups(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataGroups;
};
