import { Request, Response } from 'express';
import { createConnection, Repository } from 'typeorm';
import ReferenceEntity from '../entity/reference';
import ResultEntity from '../entity/result';

var referenceRepository: Repository<ReferenceEntity>
var resultRepository: Repository<ResultEntity>

const repository = async () => {
   const connection = await createConnection()
   referenceRepository = connection.getRepository(ReferenceEntity)
   resultRepository = connection.getRepository(ResultEntity)
}
repository()

const insert = async (req: Request, res: Response) => {
   const urlRegEx: RegExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

   if (urlRegEx.test(req.body.url)) {
      const ref = await referenceRepository.create(req.body);
      const reference = await referenceRepository.save(ref);

      res.send(reference).status(201);
   }
   else
      res.send({ error: "URL is incorrect" }).status(400)
}

const find = async (req: Request, res: Response) => {
   res.sendStatus(302);
}

const edit = async (req: Request, res: Response) => {
   res.sendStatus(200);
}

const remove = async (req: Request, res: Response) => {
   res.sendStatus(200);
}

export const referencesController = { insert, find, edit, remove }