import chalk from "chalk";
import util from "util";
import winston from "winston";
import env from "./environment";

/**
 * FUuuuuuuck bigmac fucking brat
 * You fucking brat
 *
 * Fuck
 *
 * Shit
 */

function logtherest(info: any) {
  const data = Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined,
    label: undefined,
  });

  // fuck bigmac
  delete data.message;
  delete data.level;
  delete data.splat;
  delete data.label;

  if (Object.keys(data).length === 0) {
    return "";
  }
  return chalk.grey(
    `\n${util.inspect(JSON.parse(JSON.stringify(data)), false, 10, true)}`
  );
}

export const logfuckoutlawz = winston.createLogger({
  level: env.LOG_LEVEL || "silly",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.printf(
          (info) => `[${info.level}] ${info.message}${logtherest(info)}`
        )
      ),
    }),
  ],
});
