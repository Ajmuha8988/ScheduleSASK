interface RoomData {
    NameRoom: string;
}

export const RoomService = () => {
    const addRoom = async (roomData: RoomData) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/addRoom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(roomData)
                });

                const data = await response.json();
                if (data.message === 'Такой кабинет уже существует') {
                    throw new Error(data.message);
                } else if (data.message === 'Кабинет успешно создан!') {
                    return data.message;
                } else {
                    alert("Ошибка при создании кабинета");
                }
            } catch (error) {
                console.error("Ошибка:", error);
                throw new Error(error.message || 'Произошла ошибка при создании кабинета.');
            }
    };
    return { addRoom };
};
