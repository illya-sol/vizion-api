import { createConnection } from 'typeorm'

export const testConn = (drop: boolean = false) => {
   return createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "Vizion",
      synchronize: drop,
      dropSchema: drop,
      entities: [__dirname + "/../entity/*.*"]
   })
}