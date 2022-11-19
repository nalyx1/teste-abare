import { Request, Response } from 'express';
import prisma from '../database/database';
import { createPasswordHash } from '../services/auth';

class UserController {
    async findAll(request: Request, response: Response) {
        try {
            const users = await prisma.user.findMany({
                include: {
                    carteiras: true,
                },
            });
            return response.status(200).send(users);
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }

    async findOne(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const user = await prisma.user.findFirst({
                where: {
                    id,
                },
                include: {
                    carteiras: true,
                },
            });

            if (!user) {
                return response
                    .status(404)
                    .send({ status: 404, message: `Usuário não encontrado` });
            }

            return response.status(200).send(user);
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { nome, email, senha } = request.body;

            if (!nome || !email || !senha) {
                return response.status(404).send({
                    status: 404,
                    message: `Por favor, preencha os campos nome, email e senha`,
                });
            }

            const verifyEmail = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (verifyEmail) {
                return response
                    .status(404)
                    .send({ status: 404, message: `Email ja cadastrado` });
            }

            const hashPassword = await createPasswordHash(senha);

            await prisma.user.create({
                data: {
                    nome,
                    email,
                    senha: hashPassword,
                    carteiras: {
                        create: {},
                    },
                },
            });

            return response.status(201).send();
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const user = await prisma.user.findFirst({
                where: {
                    id,
                },
            });

            if (!user) {
                return response
                    .status(404)
                    .send({ status: 404, message: `Usuário não encontrado` });
            }

            await prisma.user.delete({
                where: {
                    id,
                },
            });

            return response.status(204).send();
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }
}

export default new UserController();
