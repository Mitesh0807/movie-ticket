import { createLogger, format, transports } from "winston";
import * as path from "path";
const { combine, timestamp, label, printf,prettyPrint } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: path.basename(require!.main!.filename) }),
    timestamp(),
    myFormat,
    prettyPrint({
      colorize: true,
      depth:5
    })
  ),
  transports: [new transports.Console()],
});

export default logger;