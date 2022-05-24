"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const balance_parser_1 = require("./balance-parser");
const nanospinner_1 = require("nanospinner");
const price_checker_1 = require("./price-checker");
const prompts_1 = require("./prompts");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, prompts_1.welcomePrompt)();
        const inputToken = yield (0, prompts_1.tokenPrompt)();
        const inputDate = yield (0, prompts_1.datePrompt)();
        let spinner = (0, nanospinner_1.createSpinner)("Processing transaction history data.").start();
        let parsedBalances = yield (0, balance_parser_1.getBalancesFromCSV)("transactions.csv", {
            token: inputToken,
            date: inputDate,
        });
        if (parsedBalances.length < 1) {
            console.error("No Data found for the token and/or date you selected");
            process.exit(1);
        }
        const tokens = parsedBalances.map((tokenPortfolio) => tokenPortfolio.token);
        const tokenPrices = yield (0, price_checker_1.getPrices)(tokens).catch((e) => {
            console.warn("\n\n Pricing information for tokens could not be retrieved. Check your internet connection? \n\n");
        });
        if (tokenPrices) {
            parsedBalances = parsedBalances.map((tokenPortfolio) => {
                return Object.assign(Object.assign({}, tokenPortfolio), { portfolio_value: tokenPortfolio.portfolio_amount *
                        tokenPrices[tokenPortfolio.token].USD });
            });
        }
        spinner.success({ text: "Data parsed completely" });
        console.table(parsedBalances);
    });
}
main();
