#!/user/bin/env node

import * as fs from "fs";
import csvParser from "csv-parser";
import { Transaction } from "./models/transaction.model";
import { BalanceParserOptions } from "./models/balance-parser-options.models";

export function getBalancesFromCSV(
  path_to_file: string,
  options?: BalanceParserOptions
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      let balances: any = {};
      fs.createReadStream(path_to_file, {})
        .pipe(csvParser({}))
        .on("data", (transaction: Transaction) => {
          if (options && options.token && options.token !== transaction.token)
            return;
          if (
            options &&
            options.date &&
            transaction.timestamp > options.date + 86400
          )
            return;
          switch (transaction.transaction_type) {
            case "DEPOSIT":
              balances[transaction.token] = balances[transaction.token]
                ? balances[transaction.token] + Number(transaction.amount)
                : 0 + Number(transaction.amount);

              break;
            case "WITHDRAWAL":
              balances[transaction.token] = balances[transaction.token]
                ? balances[transaction.token] - Number(transaction.amount)
                : 0 - Number(transaction.amount);

              break;
          }
        })
        .on("end", () => {
          let balances_array: any[] = [];

          for (const key in balances) {
            balances_array.push({
              token: key,
              portfolio_amount: balances[key],
            });
          }

          resolve(balances_array);
        });
    } catch (e) {
      reject(e);
    }
  });
}
