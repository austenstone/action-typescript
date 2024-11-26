import { getInput, info, error } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

const octokit = getOctokit(input.token);

try {
  const { data: issues } = await octokit.rest.issues.list(context.repo);

  for (const issue of issues) {
    info(`#${issue.number}: ${issue.title}`);
  }
} catch (e) {
  if (e instanceof Error) {
    error(e.message);
    throw e;
  }
}
