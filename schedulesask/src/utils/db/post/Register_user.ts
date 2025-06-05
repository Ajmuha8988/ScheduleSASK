import { useNavigate } from 'react-router-dom';
interface RegisterData {
    Lastname: string;
    Firstname: string;
    Patronymic: string;
    Email: string;
    Password: string;
    CallNumber: string;
    Role: string;
}
interface ServerErrors {
    message?: string;
    messagecall?: string;
}
export const RegisterService = () => {
    const navigate = useNavigate();
    const registerUser = async (registerData: RegisterData) => {

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(registerData)
            });

            const data = await response.json();
            if (data.message === 'Пользователь с такой почтой уже существует' &&
                data.messagecall === 'Пользователь с таким номером телефона уже существует') {
                throw {
                    message: 'Пользователь с такой почтой уже существует',
                    messagecall: 'Пользователь с таким номером телефона уже существует'
                };
            } else if (data.message === 'Пользователь с такой почтой уже существует' &&
                data.messagecall === '') {
                throw {
                    message: 'Пользователь с такой почтой уже существует',
                    messagecall: ''
                };
            } else if (data.message === '' &&
                data.messagecall === 'Пользователь с таким номером телефона уже существует') {
                throw {
                    message: '',
                    messagecall: 'Пользователь с таким номером телефона уже существует'
                };
            } else if (data.message === 'Пользователь успешно зарегистрировался!' &&
                data.messagecall === '') {
                if (registerData.Role === 'Студент') {
                    localStorage.setItem('Имя', registerData.Firstname);
                    localStorage.setItem('Отчество', registerData.Patronymic);
                    localStorage.setItem('Роль', registerData.Role);
                    navigate('/students');
                } else if (registerData.Role === 'Преподаватель') {
                    localStorage.setItem('Имя', registerData.Firstname);
                    localStorage.setItem('Отчество', registerData.Patronymic);
                    localStorage.setItem('Роль', registerData.Role);
                    navigate('/teachers');
                } else {
                    alert(registerData.Role);
                }
            } else {
                throw {
                    message: 'Произошла ошибка при регистрации (в клиентской части)',
                    messagecall: ''
                };
            }
        } catch (error) {
            const serverErrors: ServerErrors = {};
            if (typeof error === 'object' && error !== null) {
                Object.assign(serverErrors, error);
            }
            throw new Error(JSON.stringify(serverErrors));
        }
    };

    return { registerUser };
};