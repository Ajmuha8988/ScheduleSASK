import { useState } from 'react'; 
import "./mobilebody.css"
import { DeleteGroupService } from '../../utils/db/delete/exitGroup';

type Props = {
    onLogout?: () => void; // Опциональный колбэк для дополнительной логики
};

const RemoveGroupButton: React.FC<Props> = () => {
    const { exitgroup } = DeleteGroupService();
    const [error, setError] = useState<string | null>(null);
    const ExitGroupsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof exitgroup === 'function') { // Проверяем существование и возможность вызова
            try {
                await exitgroup(); // Вызываем метод удаления группы
            } catch (err) {
                let errorMessage = '';
                if (err instanceof Error) {
                    errorMessage = err.message;
                } else {
                    errorMessage = String(err); // Преобразуем ошибку в строку
                }
                setError(errorMessage); // Устанавливаем сообщение об ошибке
            }
        } else {
            console.error("Метод exitgroup не определен");
        }
    };
    return (
        <form className="col-lg-2 h-25" onSubmit={ExitGroupsSubmit}>
            <button className="btn mt-2 btn-danger text-light mobile-button">
                Удалить группу
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        
    );
};

export default RemoveGroupButton;