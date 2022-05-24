#!/user/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalancesFromCSV = void 0;
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function getBalancesFromCSV(path_to_file, options) {
    return new Promise((resolve, reject) => {
        try {
            let balances = {};
            fs.createReadStream(path_to_file, {})
                .pipe((0, csv_parser_1.default)({}))
                .on("data", (transaction) => {
                if (options && options.token && options.token !== transaction.token)
                    return;
                if (options &&
                    options.date &&
                    transaction.timestamp > options.date + 86400)
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
                let balances_array = [];
                for (const key in balances) {
                    balances_array.push({
                        token: key,
                        portfolio_amount: balances[key],
                    });
                }
                resolve(balances_array);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.getBalancesFromCSV = getBalancesFromCSV;
