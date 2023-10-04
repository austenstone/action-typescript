import { getInput, info } from "@actions/core";
import { getOctokit } from "@actions/github";

interface Input {
  token: string;
}

export function getInputs(): Input {
  const result = {} as Input;
  result.token = getInput("github-token");
  return result;
}

const run = async (): Promise<void> => {
  const input = getInputs();
  const octokit = getOctokit(input.token);

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  info(`Hello, ${login}!`);
};

run();
