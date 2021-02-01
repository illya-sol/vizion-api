
import bodyparser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import referencesRouter from './references/referencesRouter'
import resultsRouter from './results/resultRouter'

let connection: Connection

const main = async () => {
   const app: Application = express()
   connection = await createConnection()
   const port: number = 4000
   const format = '[:date[web]] :method ":url" :status :response-time'

   app.use(morgan(format, {
      skip: (req: Request, res: Response) => { return res.statusCode < 400 },
      stream: process.stderr
   }));

   app.use(morgan(format, {
      skip: (req: Request, res: Response) => { return res.statusCode >= 400 },
      stream: process.stdout
   }))

   app.use(cors());
   app.use(bodyparser.urlencoded({ extended: false }))
   app.use(bodyparser.json())

   app.use('/references', referencesRouter)
   app.use('/results', resultsRouter)

   app.listen(port, () => {
      console.log('\x1b[32m', '\nServer Launched')
      console.log('\x1b[37m', '')
   });

}
main()

export { connection }

