# Portfolio CLI Tool

This interactive CLI tool returns portfolio values for tokens. You may specify a date and/or a token.

## Dependencies

- This tool requires you have node.js installed (v14+ recommended)
- A javascript package manager (yarn recommended)

## Setup

- Clone [this repository](https://github.com/uchebuego/propine-challenge.git) locally.

- Install dependencies with your package manager (eg: `yarn install`)

- Run the 'setup' npm script (eg: `yarn setup`). This command will download the needed data, and requires an internet connection.

- Build the project by running `yarn build` or `npm run build` in the project directory.

- Run the CLI tool with `node .`

- You can also build and run the cli tool in one step with the start npm script. `yarn start` or `npm start`

## Usage

- You can enter the ticker for the cryptocurrencies you're interested in (In Uppercase) when prompted. Leave blank for all tokens

- You can enter a date (yyyy-mm-dd) when prompted, if you would like to see the portfolio value for the token(s) as at that date. Leave blank to see the portfolio value for that token to date.

## Design decisions

In this implementation, the whole file is never loaded completely into memory as memory is a limited resource, and we may not be able to predict exactly how much we will need in the future if it works that way.

In this implementation, the transaction history is instead streamed into the program, a single record at a time, and the useful information is extracted from each record and consumed.

Pricing information is obtained on the fly with cryptocompare.com's public API, so the pricing information for token is pretty much guaranteed to always be up-to-date.
