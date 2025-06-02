import { Request, Response } from 'express';
import * as sql from 'mssql';
import sqlConfig from '../config/config';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string | number; // Идентификатор пользователя (может быть строковым или числовым)
    iat: number;        // Время выдачи токена (issued at time)
    exp: number;        // Срок действия токена (expiration time)
}

export const getRoleByUserID = async (req: Request, res: Response) => {
    try {
        // Подключаемся к базе данных
        await sql.connect(sqlConfig);
        
        // Проверяем JWT токен пользователя
        const decodedToken = jwt.verify(req.cookies.jwt, 'TheBestInTheWorld!') as JwtPayload;
        const request = new sql.Request();
        const result = await request.input('userId', sql.BigInt, decodedToken.id)
            .query(`SELECT Role FROM Users WHERE ID_user = @userId`);
        res.send(result.recordset); // Роль найдена, отправляем данные

    } catch (err) {
        res.status(500).json({ message: 'Пользователь не зарегистрировался.' });
    }
};
