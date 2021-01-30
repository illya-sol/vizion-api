import express from 'express';

const insert = (req: express.Request, res: express.Response) => {
   res.sendStatus(201);
}

const find = (req: express.Request, res: express.Response) => {
   res.sendStatus(302);
}

const edit = (req: express.Request, res: express.Response) => {
   res.sendStatus(200);
}

const remove = (req: express.Request, res: express.Response) => {
   res.sendStatus(200);
}


export const referencesController = { insert, find, edit, remove }