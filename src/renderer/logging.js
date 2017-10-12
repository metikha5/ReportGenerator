import { createLogger, format, transports } from 'winston'
import path from 'path'
import { mkdirSync, existsSync } from 'fs'

let logger
if (process.env.NODE_ENV !== 'development') {
  logger = {
    info: console.log,
    error: console.error
  }
} else {
  const { combine, timestamp, printf } = format

  // Create logs folder
  let logsFolder = path.join(__dirname, 'logs')
  if (!existsSync(logsFolder)) {
    try {
      mkdirSync(logsFolder)
    } catch (e) {
      logsFolder = __dirname
      console.log(`Unable to create folder: ${logsFolder}`)
    }
  }

  //
  const myFormat = printf(info => {
    return `${info.timestamp} --- [${info.level.toUpperCase()}] --- ${info.message}`
  })
  logger = createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.File({ filename: path.join(logsFolder, '/error.log'), level: 'error', timestamp: true }),
      new transports.File({ filename: path.join(logsFolder, '/info.log'), timestamp: true })
    ]
  })

  if (logsFolder === __dirname) {
    // We assume it was not possible to create a logs folder
    logger.error(`Unable to create folder: ${path.join(__dirname, 'logs')}`)
  }
}
export default logger
