import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AuthorizateData {
    Email: string;
    Password: string;
   
}

export const AuthorizateService = () => {
    const navigate = useNavigate();

    const authorizateUser = async (authorizateData: AuthorizateData) => {

        try {
            // Отправляем данные на сервер
            const response = await fetch('http://localhost:8080/authorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(authorizateData)
        });
                    const data = await response.json();
                    if (data.message === 'Вы ввели неверный логин или пароль') {
                        throw {
                            message: data.message
                        };
                    }
                    else if (data.message === 'Пользователь успешно авторизован!') {
                        if (data.role === 'Студент') {
                            const firstname = data.firstname;
                            const patronymic = data.patronymic;
                            localStorage.setItem('Имя', firstname);
                            localStorage.setItem('Отчество', patronymic);
                            navigate('/students');
                        }
                        else if (data.role === 'Преподаватель') {
                            const firstname = data.firstname;
                            const patronymic = data.patronymic;
                            localStorage.setItem('Имя', firstname);
                            localStorage.setItem('Отчество', patronymic);
                            navigate('/teachers');
                        }
                        else if (data.role === 'Администратор') {
                            const firstname = data.firstname;
                            const patronymic = data.patronymic;
                            localStorage.setItem('Имя', firstname);
                            localStorage.setItem('Отчество', patronymic);
                            navigate('/administrator');
                        }
                        else {
                            alert("Ошибка на стороне сервера")
                        }


                    } else {
                        alert('Произошла ошибка при авторизации'); // Общее сообщение об ошибке
                    }
                
        } catch (error) {
            throw new Error(
                error.message
            );
        }
    };

    return { authorizateUser };
};