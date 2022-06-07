import pino from "pino"
import { config } from "./config"

export const logger = pino({
  name: process.env["npm_package_name"],
  ...(config.get("env") !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "hostname,pid",
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      },
    },
  }),
})
