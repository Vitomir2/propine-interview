import { getBalancesFromCSV } from "./balance-parser";
import { createSpinner } from "nanospinner";
import { getPrices } from "./price-checker";
import { datePrompt, tokenPrompt, welcomePrompt } from "./prompts";

async function main() {
  await welcomePrompt();

  const inputToken = await tokenPrompt();
  const inputDate = await datePrompt();

  let spinner = createSpinner("Processing transaction history data.").start();

  let parsedBalances = await getBalancesFromCSV("transactions.csv", {
    token: inputToken,
    date: inputDate,
  });

  if (parsedBalances.length < 1) {
    console.error("No Data found for the token and/or date you selected");
    process.exit(1);
  }

  const tokens = parsedBalances.map(
    (tokenPortfolio: any) => tokenPortfolio.token
  );

  const tokenPrices = await getPrices(tokens).catch((e) => {
    console.warn(
      "\n\n Pricing information for tokens could not be retrieved. Check your internet connection? \n\n"
    );
  });

  if (tokenPrices) {
    parsedBalances = parsedBalances.map((tokenPortfolio: any) => {
      return {
        ...tokenPortfolio,
        portfolio_value:
          tokenPortfolio.portfolio_amount *
          tokenPrices[tokenPortfolio.token].USD,
      };
    });
  }

  spinner.success({ text: "Data parsed completely" });

  console.table(parsedBalances);
}

main();
