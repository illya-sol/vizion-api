import { Router } from 'express'
import { referencesController } from './referencesController'

const referencesRouter: Router = Router()

referencesRouter.post('/', referencesController.insert)
referencesRouter.get('/all', referencesController.findAll)
referencesRouter.get('/:ref_id', referencesController.find)
referencesRouter.delete('/:ref_id', referencesController.remove)

export default referencesRouter