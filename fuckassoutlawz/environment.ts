import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
export default z
  .object({
    TOKEN_2CAPTCHA: z.string(),
    LOG_LEVEL: z.string(),
  })
  .parse(process.env);
