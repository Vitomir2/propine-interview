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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datePrompt = exports.tokenPrompt = exports.welcomePrompt = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function welcomePrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield inquirer_1.default.prompt({
            name: "welcome_prompt",
            message: "Hello. This tool fetches portfolio values for tokens in our database. Press enter to continue \n",
        });
        console.clear();
    });
}
exports.welcomePrompt = welcomePrompt;
function tokenPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer_1.default.prompt({
            name: "token_ticker",
            message: "Enter the ticker for the token you're interested in (Leave blank to see all) \n",
        });
        return answer.token_ticker || undefined;
    });
}
exports.tokenPrompt = tokenPrompt;
function datePrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer_1.default.prompt({
            name: "date",
            message: "Enter the date [yyyy-mm-dd] you're you're interested in (Leave blank to see all) \n",
        });
        if (!answer.date)
            return undefined;
        const isoDateStringRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!isoDateStringRegex.test(answer.date)) {
            console.error("Invalid date provided");
            process.exit(1);
        }
        let date;
        date = Math.floor(new Date(answer.date).getTime() / 1000);
        return date;
    });
}
exports.datePrompt = datePrompt;
