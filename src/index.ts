import { getInput, info, group } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

info(JSON.stringify(input, null, 2));

const octokit = getOctokit(input.token);

await group("Issues", async () => {
  const { data: issues } = await octokit.rest.issues.list(context.repo);

  for (const issue of issues) {
    info(`#${issue.number}: ${issue.title}`);
  }
});
