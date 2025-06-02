interface GeneralBurdenData {
    ID_Teacher: bigint;
    FirstSemester: number;
    SecondSemester: number;
}

export const GeneralBurdenService = () => {
        const addGeneralBurden = async (groupData: GeneralBurdenData) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/addGeneralBurden', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(groupData)
                });

                const data = await response.json();
                if (data.message === 'У преподавателя уже установлено учебная нагрузка') {
                    throw new Error(data.message);
                }
                else {
                    return data.message;
                }
            } catch (error) {
                console.error("Ошибка:", error);
                throw new Error(error.message || 'Ошибка при установке нагрузки преподавателя.');
            }
        };

        return { addGeneralBurden };
};
