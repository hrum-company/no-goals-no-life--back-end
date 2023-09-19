import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as fs from 'fs'
import * as path from 'path'

BigInt.prototype['toJSON'] = function () {
  return this.toString()
}

async function bootstrap() {
  const keyPath = process.env.SSL_KEY || null
  const crtPath = process.env.SSL_CRT || null

  const httpsOptions =
    keyPath && crtPath
      ? {
          key: fs.readFileSync(path.join(__dirname, keyPath)),
          cert: fs.readFileSync(path.join(__dirname, crtPath)),
        }
      : null

  const port = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true })
  await app.listen(port)

  console.log('App started at port: ', port)
}
bootstrap()
