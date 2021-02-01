import { Request, Response } from 'express';
import { createConnection, Repository } from 'typeorm';
import ReferenceEntity from '../entity/reference';
import ResultEntity from '../entity/result';
import { Data } from '../types/reference';
import LookUpURL from '../worker/worker.js';

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
      const reference: ReferenceEntity = await referenceRepository.save({ url: req.body.url });
      res.send(reference).status(201);

      const data: Data = await LookUpURL(req.body.url)
      await resultRepository.save({
         title: data.title,
         meta_description: data.meta_description,
         reference_: reference
      })
   }
   else
      res.send({ error: "URL is incorrect" }).status(400)
}

const find = (req: Request, res: Response) => {
   referenceRepository.findOneOrFail(req.params.ref_id).then(reference => {
      res.send(reference).status(302)
   }).catch((error) => res.send(error).status(404))
}

const findAll = async (req: Request, res: Response) => {
   const references = await referenceRepository.find({ order: { id: 'ASC' } })
   res.send(references).status(302)
}

const remove = async (req: Request, res: Response) => {
   try {
      const reference = await referenceRepository.findOne(req.params.ref_id)
      const result = await resultRepository.findOne({ reference_: reference })
      result?.remove()
      reference?.remove()
      res.send({ id: reference?.id, message: "removed" }).status(200);
   }
   catch (error) {
      res.send(error).status(400)
   }
}

export const referencesController = { insert, find, findAll, remove }