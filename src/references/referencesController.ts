import { Request, Response } from 'express';

const insert = (req: Request, res: Response) => {
   res.sendStatus(201);
}

const find = (req: Request, res: Response) => {
   res.sendStatus(302);
}

const edit = (req: Request, res: Response) => {
   res.sendStatus(200);
}

const remove = (req: Request, res: Response) => {
   res.sendStatus(200);
}


export const referencesController = { insert, find, edit, remove }