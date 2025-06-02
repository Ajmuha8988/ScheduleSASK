interface LessonData {
    NameLesson: string;
}

export const LessonService = () => {
    const addLesson = async (lessonData: LessonData) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/addLesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(lessonData)
                });

                const data = await response.json();
                if (data.message === 'Такой учебный предмет уже существует') {
                    throw new Error(data.message);
                } else if (data.message === 'Учебный предмет успешно создан!') {
                    return data.message;
                } else {
                    alert("Ошибка при создании учебного предмета");
                }
            } catch (error) {
                console.error("Ошибка:", error);
                throw new Error(error.message || 'Произошла ошибка при создании учебного предмета.');
            }
    };
    return { addLesson };
};
