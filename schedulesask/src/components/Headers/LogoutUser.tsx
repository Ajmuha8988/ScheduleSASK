import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import "./mobileheaders.css"

type Props = {
    onLogout?: () => void; // Опциональный колбэк для дополнительной логики
};

const LogoutButton: React.FC<Props> = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = useCallback(async () => {
        try {
            // Отправляем запрос на сервер для удаления куку
            await fetch('http://localhost:8080/logout', {
                method: 'POST', // Или GET, зависит от вашей серверной логики
                credentials: 'include' // Включаем cookies в запрос
            });

            // Очищаем локальное хранилище
            localStorage.clear();

            // Выполняем дополнительную логику (если есть)
            onLogout?.();

            // Перенаправляем пользователя на главную страницу
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    }, [navigate, onLogout]);
    return (
        <button className="btn btn-warning text-light mobile-button ms-2" onClick={handleLogout}>
            Выход
        </button>
    );
};

export default LogoutButton;