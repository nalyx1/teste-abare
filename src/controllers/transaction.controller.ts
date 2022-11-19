import { Request, Response } from 'express';
import prisma from '../database/database';

class Transaction {
    async findAll(request: Request, response: Response) {
        try {
            const transactions = await prisma.transaction.findMany({
                include: {
                    carteira: true,
                },
            });
            return response.status(200).send(transactions);
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
            const transaction = await prisma.transaction.findFirst({
                where: {
                    id,
                },
                include: {
                    carteira: true,
                },
            });

            if (!transaction) {
                return response
                    .status(404)
                    .send({ status: 404, message: `Transação não encontrada` });
            }

            return response.status(200).send(transaction);
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const { carteiraOrigem, carteiraDestino, valor } = request.body;

            if (!valor) {
                return response.status(404).send({
                    status: 404,
                    message: `Valor não pode estar em branco`,
                });
            }

            const findCarteiraOrigem = await prisma.wallet.findFirst({
                where: {
                    id: carteiraOrigem,
                },
            });
            if (!findCarteiraOrigem) {
                return response.status(404).send({
                    status: 404,
                    message: `Carteira origem incorreta`,
                });
            }

            const findCarteiraDestino = await prisma.wallet.findFirst({
                where: {
                    id: carteiraDestino,
                },
            });
            if (!findCarteiraDestino) {
                return response.status(404).send({
                    status: 404,
                    message: `Carteira destino incorreta`,
                });
            }

            const transation = await prisma.transaction.create({
                data: {
                    carteiraOrigem,
                    carteiraDestino,
                    valor,
                    carteira: {
                        connect: [
                            { id: carteiraOrigem },
                            { id: carteiraDestino },
                        ] as any,
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
}

export default new Transaction();
