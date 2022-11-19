import { Router } from 'express';
import transactionController from '../controllers/transaction.controller';

const routes = Router();

routes.get('/transaction', transactionController.findAll);
routes.get('/transaction/:id', transactionController.findOne);
routes.post('/transaction', transactionController.create);

export default routes;
