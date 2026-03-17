import { getInput, info, group } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token", { required: true }),
};

const octokit = getOctokit(input.token);

await group("Issues", async () => {
  const { data: issues } = await octokit.rest.issues.listForRepo(context.repo);

  for (const issue of issues) {
    info(`#${issue.number}: ${issue.title}`);
  }
});
