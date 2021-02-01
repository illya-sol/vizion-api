import { Router } from 'express'
import { referencesController } from './referencesController'

const referencesRouter: Router = Router()

referencesRouter.post('/', referencesController.insert)
referencesRouter.get('/:ref_id', referencesController.find)
referencesRouter.get('/:ref_id', referencesController.findAll)
referencesRouter.patch('/:ref_id', referencesController.edit)
referencesRouter.delete('/:ref_id', referencesController.remove)

export default referencesRouter