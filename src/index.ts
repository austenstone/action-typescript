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
  if (e instanceof Error) {
    const stack = e.stack?.split("\n").map((s) => {
      const path = s.split("/");
      const _file = path[path.length - 1];
      const [file, startLine, startColumn] = _file.split(":");
      return {
        file,
        startLine: Number(startLine),
        startColumn: Number(startColumn),
      };
    });
    info(`Stack: ${JSON.stringify(stack, null, 2)}`);
    error(e.message, {
      title: e.name,
      ...(stack ? stack[stack.length - 1] : {}),
    });
  }
  throw e;
}
