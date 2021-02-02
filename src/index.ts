import bodyparser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import referencesRouter from './modules/references/referencesRouter'
import resultsRouter from './modules/results/resultRouter'

const connect = async () => { await createConnection() }

connect()
const app = express()
const port: string = process.env.PORT || '4000'
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

