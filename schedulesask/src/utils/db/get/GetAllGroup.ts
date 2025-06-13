import { API_URL } from '../../API/config_APIts';
import { useState, useEffect } from 'react';
interface Groups {
    NameGroup: string;
    ID_Group: number;
}
// Кастомный хук для получения данных
export const GetAllgroups = () => {
    const [dataGroups, setDataGroups] = useState<Groups[]>([]);
    useEffect(() => {
        fetch(API_URL + '/AllGroups')
            .then(response => response.json())
            .then(data => setDataGroups(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return dataGroups;
};
