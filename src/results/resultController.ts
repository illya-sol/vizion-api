import { Request, Response } from 'express';
import { createConnection, Repository } from 'typeorm';
import ResultEntity from '../entity/result';

var resultRepository: Repository<ResultEntity>

const repository = async () => {
   const connection = await createConnection()
   resultRepository = connection.getRepository(ResultEntity)
}
repository()

const find = async (req: Request, res: Response) => {
   res.sendStatus(302);
}

const remove = async (req: Request, res: Response) => {
   res.sendStatus(302);
}

export const resultsController = { find, remove }