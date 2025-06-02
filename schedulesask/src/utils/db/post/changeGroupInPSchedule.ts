interface changeGroup {
    NameGroup: string;
}

export const changeGroupService = () => {
    const EventChangeGroup = async (groupData: changeGroup) => {
        try {
            const response = await fetch('http://localhost:8080/administrator/changeGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(groupData)
            });
            const data = await response.json();
            if (data.message === 'Учебный план успешно воссоздан!') {
                return data.message;
            } else if (data.error === 'Такая запись уже существует!') {
                throw new Error(data.error);
            } else if (data.error === 'Превышено нагрузка на преподавателя!') {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            throw new Error(error.message || 'Ошибка при редактировании.');
        }
    };

    return { EventChangeGroup };
};
