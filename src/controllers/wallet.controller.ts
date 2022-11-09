import { Request, Response } from 'express';
import prisma from '../database/database';

class Wallet {
    async findAll(request: Request, response: Response) {
        try {
            const wallets = await prisma.wallet.findMany({
                include: {
                    transacoes: true,
                },
            });
            return response.status(200).send(wallets);
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
            const wallet = await prisma.wallet.findFirst({
                where: {
                    id,
                },
                include: {
                    transacoes: true,
                },
            });

            if (!wallet) {
                return response
                    .status(404)
                    .send({ status: 404, message: `Carteira não encontrada` });
            }

            return response.status(200).send(wallet);
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .send({ status: 500, message: `Internal Server Error` });
        }
    }
}

export default new Wallet();
