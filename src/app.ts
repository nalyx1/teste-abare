import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import walletRoutes from './routes/wallet.routes';
import transactionRoutes from './routes/transaction.routes';
import sessionRoutes from './routes/session.routes';

class App {
    public server: Express;
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        this.server.use(sessionRoutes);
        this.server.use(userRoutes);
        this.server.use(walletRoutes);
        this.server.use(transactionRoutes);
    }
}

export default new App().server;
