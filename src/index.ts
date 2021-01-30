import bodyparser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import referencesRouter from './references/referencesRouter'

const app: Application = express();
const port: number = 4000;
const format = '[:date[web]] :method ":url" :status :response-time';

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

app.listen(port, () => {
   console.log('\x1b[32m', '\nServer Launched')
   console.log('\x1b[37m', '')
});
