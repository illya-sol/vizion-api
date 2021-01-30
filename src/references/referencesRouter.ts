import express from 'express'

const referencesRouter: express.Router = express.Router()

referencesRouter.get('/', (req: express.Request, res: express.Response) => {
   res.sendStatus(200)
})

export default referencesRouter