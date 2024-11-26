import { getInput, info } from "@actions/core";
import { getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

const octokit = getOctokit(input.token);

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

info(`Hello, ${login}!`);
