import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import prisma from '../database/database';
import { checkPassword } from '../services/auth';

class SessionController {
    async create(request: Request, response: Response) {
        try {
            const { email, senha } = request.body;
            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                return response
                    .status(401)
                    .json({ message: 'Email e/ou senha inválidos' });
            }

            const verifyPassword = await checkPassword(senha, user.senha);
            if (!verifyPassword) {
                return response
                    .status(401)
                    .json({ message: 'Email e/ou senha inválidos' });
            }

            const { id } = user;
            const secret = process.env.APP_SECRET;

            return response.json({
                token: jwt.sign({ id }, secret!, {
                    expiresIn: '7d',
                }),
            });
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .json({ error: 'Internal Server Error' });
        }
    }
}

export default new SessionController();
