import { Router } from 'express'
import { resultsController } from './resultController'

const resultsRouter: Router = Router()

resultsRouter.get('/:res_id', resultsController.find)
resultsRouter.delete('/:res_id', resultsController.remove)

export default resultsRouter