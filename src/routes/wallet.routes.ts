import { Router } from 'express';
import walletController from '../controllers/wallet.controller';

const routes = Router();

routes.get('/wallet', walletController.findAll);
routes.get('/wallet/:id', walletController.findOne);

export default routes;
