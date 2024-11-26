import { getInput, info, error, group } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

info(JSON.stringify(input, null, 2));
info(JSON.stringify(context.repo, null, 2));

const octokit = getOctokit(input.token);

try {
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  info(`Hello ${login}!`);

  await group("Issues", async () => {
    const { data: issues } = await octokit.rest.issues.list(context.repo);

    for (const issue of issues) {
      info(`#${issue.number}: ${issue.title}`);
    }
  });
} catch (e) {
  error(JSON.stringify(e, null, 2));
  if (e instanceof Error) {
    error(e.message);
  }
  throw e;
}
