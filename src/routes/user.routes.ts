import { Router } from 'express';
import userController from '../controllers/user.controller';
import jwtAuth from '../middlewares/jwtAuthentication.middleware';

const routes = Router();

routes.post('/user', userController.create);

routes.use(jwtAuth);

routes.get('/user', userController.findAll);
routes.get('/user/:id', userController.findOne);
routes.delete('/user/:id', userController.delete);

export default routes;
