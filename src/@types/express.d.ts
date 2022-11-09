import { Request } from 'express';

interface IUserIdRequest extends Request {
    userId: string;
}

export default IUserIdRequest;
