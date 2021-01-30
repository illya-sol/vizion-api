import express from 'express'
import { referencesController } from './referencesController'

const referencesRouter: express.Router = express.Router()

referencesRouter.post('/', referencesController.insert)
referencesRouter.get('/', referencesController.find)
referencesRouter.patch('/', referencesController.edit)
referencesRouter.delete('/', referencesController.remove)

export default referencesRouter