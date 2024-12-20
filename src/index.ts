import { getInput, info, error, group } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const input = {
  token: getInput("github-token"),
};

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
  if (e instanceof Error) {
    const lastStackEntry = e.stack
      ?.split("\n")
      .pop()
      ?.split("at ")
      .pop()
      ?.split(":");
    const stackInfo = lastStackEntry
      ? {
          file: lastStackEntry[0],
          startLine: parseInt(lastStackEntry[1]),
          startColumn: parseInt(lastStackEntry[2]),
        }
      : {};

    stackInfo.file = stackInfo.file?.split("/").slice(6).join("/");
    error(`${e.message}\n${JSON.stringify(e, null, 2)}`, {
      title: e.name,
      ...stackInfo,
    });
  }
  throw e;
}
