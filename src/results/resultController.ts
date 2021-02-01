import { Request, Response } from 'express';
import { createConnection, Repository } from 'typeorm';
import ReferenceEntity from '../entity/reference';
import ResultEntity from '../entity/result';

var referenceRepository: Repository<ReferenceEntity>
var resultRepository: Repository<ResultEntity>

const repository = async () => {
   const connection = await createConnection()
   resultRepository = connection.getRepository(ResultEntity)
   referenceRepository = connection.getRepository(ReferenceEntity)
}
repository()

const find = async (req: Request, res: Response) => {
   try {
      const reference = await referenceRepository.findOne(req.params.ref_id)
      const result = await resultRepository.findOne({ reference_: reference })
      res.send({
         id: result?.id,
         reference_id: req.params.ref_id,
         data: {
            title: result?.title,
            meta_description: result?.meta_description
         },
         created_at: result?.created_at
      }).status(200);
   }
   catch (err) {
      res.send(err).status(400)
   }
}

export const resultsController = { find }