import { Command } from "@oclif/command";
import { resetAccounts } from "../bigmacass/bigmacreset";
import { readLine } from "../bigmacass/parsebigmac";

export default class Reset extends Command {
  static description = "send reset requests to the given spotify accounts";

  static examples = [];

  static flags = {};

  static args = [
    { name: "accounts", required: true },
    { name: "proxies", required: true },
  ];

  async run() {
    const { args } = this.parse(Reset);

    const accounts = readLine(args.accounts);
    const proxies = readLine(args.proxies);

    this.warn("fuck bigmac ! fuck outlawz!!!!");

    this.log(`Loaded ${accounts.length} accounts.`);
    this.log(`Loaded ${proxies.length} proxies.`);

    this.log("started resetter");
    await resetAccounts(accounts, proxies);
  }
}
