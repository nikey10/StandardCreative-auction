import config from '@standardcreative/server-core/src/appconfig'
import seeder from '@standardcreative/server-core/src/util/seeder'
import { PrismaClient, Prisma } from '@prisma/client'
import { setTimeout } from 'timers'
import { Application } from '../declarations'
import seederConfig from './seeder-config'

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/

export default (app: Application): void => {
  try {
    const { performDryRun } = config.server
    let { forceRefresh } = config.db

    console.log('Starting app')

    const prismaClient = new PrismaClient();

    const oldSetup = app.setup

    app.set('prismaClient', prismaClient)

    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.setup = function (...args: any): Application {
      let promiseResolve, promiseReject
      app.isSetup = new Promise((resolve, reject) => {
        promiseResolve = resolve
        promiseReject = reject
      })

      prismaClient
        .$executeRaw(Prisma.sql `SET FOREIGN_KEY_CHECKS = 0`)
        .then(() => {
          return prismaClient.$queryRaw(Prisma.sql `SHOW TABLES LIKE 'user';`)
        })
        .then(([results]) => {
          if (results.length === 0) {
            console.log('User table does not exist.')
            console.log('Detected unseeded database. Forcing Refresh.')
            forceRefresh = true
          }
        })
        .then(async () => {
          // Sync to the database
          for (const model of Object.keys(Prisma.ModelName)) {
            if (forceRefresh) console.log('creating associations for =>', Prisma.ModelName[model])
            if (typeof (Prisma.ModelName[model] as any).associate === 'function') {
              ;(Prisma.ModelName[model] as any).associate(Prisma.ModelName)
            }
          }
          
          try {
            await prismaClient.$connect()
            return (
              app
                .configure(
                  seeder({
                    delete: forceRefresh,
                    disabled: !forceRefresh,
                    services: seederConfig
                  })
                )
                // @ts-ignore
                .seed()
                .then(() => {
                  console.log('Server Ready')
                  return Promise.resolve()
                })
                .catch((err) => {
                  console.log('Feathers seeding error')
                  console.log(err)
                  promiseReject()
                  throw err
                })
            )
            if (performDryRun) {
              setTimeout(() => process.exit(0), 5000)
            }
          } catch (err_1) {
            console.log('Prisma setup error')
            console.log(err_1)
            promiseReject()
            throw err_1
          }
        })
        .then((sync) => {
          app.set('prismaSync', sync)
          return prismaClient.$executeRaw(Prisma.sql `SET FOREIGN_KEY_CHECKS = 1`)
        })
        .then(async () => {
          if (forceRefresh === true && urlRegex.test(config.server.defaultContentPackURL)) {
            try {
              await app.service('content-pack').update(null, {
                manifestUrl: config.server.defaultContentPackURL
              })
            } catch (err) {
              console.log('Error downloading initial content pack')
              console.error(err)
            }
            promiseResolve()
            return Promise.resolve()
          } else {
            promiseResolve()
            return Promise.resolve()
          }
        })
        .catch((err) => {
          console.log('Prisma sync error')
          console.log(err)
          promiseReject()
          throw err
        })
      return oldSetup.apply(this, args)
    }
  } catch (err) {
    console.log('Error in app/prisma.ts')
    console.log(err)
  }
}
