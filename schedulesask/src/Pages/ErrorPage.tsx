import LayoutMain from "../components/Headers/LayoutMain"
import { useEffect } from 'react';
import ErrorBody from "../components/Body/ErrorBody"
import { API_URL } from '../utils/API/config_APIts';

const ErrorPage = () => {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Отправляем запрос на сервер для удаления куки
                await fetch(API_URL + '/logout', {
                    method: 'POST',
                    credentials: 'include'
                });

                // Очищаем локальное хранилище
                localStorage.clear();
            } catch (error) {
                console.error('Ошибка выхода:', error);
            }
        };

        handleLogout(); // Немедленно выполняем выход при первой загрузке страницы
    }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только при монтировании компонента
    return (
        <html>
            <LayoutMain></LayoutMain>
            <ErrorBody></ErrorBody>
        </html>
    );
};
export default ErrorPage;