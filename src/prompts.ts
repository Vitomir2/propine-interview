import inquirer from "inquirer";

export async function welcomePrompt() {
  await inquirer.prompt({
    name: "welcome_prompt",
    message:
      "Hello. This tool fetches portfolio values for tokens in our database. Press enter to continue \n",
  });

  console.clear();
}

export async function tokenPrompt(): Promise<string | undefined> {
  const answer = await inquirer.prompt({
    name: "token_ticker",
    message:
      "Enter the ticker for the token you're interested in (Leave blank to see all) \n",
  });

  return answer.token_ticker || undefined;
}

export async function datePrompt(): Promise<number | undefined> {
  const answer = await inquirer.prompt({
    name: "date",
    message:
      "Enter the date [yyyy-mm-dd] you're you're interested in (Leave blank to see all) \n",
  });

  if (!answer.date) return undefined;

  const isoDateStringRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!isoDateStringRegex.test(answer.date)) {
    console.error("Invalid date provided");
    process.exit(1);
  }

  let date;

  date = Math.floor(new Date(answer.date).getTime() / 1000);

  return date;
}
