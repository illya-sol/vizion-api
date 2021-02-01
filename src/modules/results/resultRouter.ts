import { Router } from 'express'
import { resultsController } from './resultController'

const resultsRouter: Router = Router()

resultsRouter.get('/:ref_id', resultsController.find)

export default resultsRouter