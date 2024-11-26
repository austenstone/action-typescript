import { getInput, info, error } from "@actions/core";
import { getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

const octokit = getOctokit(input.token);

try {
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  info(`Hello, ${login}!`);
} catch (e) {
  if (e instanceof Error) {
    error(e.message);
  }
}
