import { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf } = format

let logger
if (process.env.NODE_ENV === 'development') {
  logger = {
    info: console.log,
    error: console.error
  }
} else {
  const myFormat = printf(info => {
    return `${info.timestamp} --- [${info.level.toUpperCase()}] --- ${info.message}`
  })
  logger = createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error', timestamp: true, handleExceptions: true }),
      new transports.File({ filename: 'info.log', timestamp: true })
    ]
  })
}
export default logger
