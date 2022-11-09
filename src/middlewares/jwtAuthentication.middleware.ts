import { Response, NextFunction } from 'express';
import IUserIdRequest from '../@types/express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtAuth: any = async (
    request: IUserIdRequest,
    response: Response,
    next: NextFunction
) => {
    const secret = process.env.APP_SECRET;
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: 'Forneça um token válido' });
    }

    const [authType, token] = authorization.split(' ');
    if (authType !== 'Bearer' || !token) {
        return response.status(401).json({ error: 'Token inválido' });
    }

    try {
        if (secret) {
            const decoded = jwt.verify(token, secret) as any;
            request.userId = decoded.id;

            return next();
        }
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido' });
    }
};

export default jwtAuth;
