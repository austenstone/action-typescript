import * as core from '@actions/core';
import * as github from '@actions/github';

interface Input {
  token: string;
}

export function getInputs(): Input {
  const result = {} as Input;
  result.token = core.getInput('github-token');
  return result;
}

const run = async (): Promise<void> => {
    const input = getInputs();
    const octokit: ReturnType<typeof github.getOctokit> = github.getOctokit(input.token);

    const {
      viewer: { login },
    }: any = await octokit.graphql(`{ 
      viewer {
        login
      }
    }`);

    core.info(`Hello, ${login}!`);
};

run();