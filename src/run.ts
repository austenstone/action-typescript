import * as core from '@actions/core';
import * as github from '@actions/github';

interface Inputs {
  token: string;
}

export function getInputs(): Inputs {
  const result = {} as Inputs;
  
  result.token = core.getInput('github-token');
  if (!result.token) throw Error('No input \'github-token\'');

  return result;
}

const run = async (): Promise<void> => {
  try {
    const inputs = getInputs();
    const octokit = github.getOctokit(inputs.token);

    const {
      viewer: { login },
    } = await octokit.graphql(`{ 
      viewer { 
        login
      }
    }`);

    core.info(`Hello, ${login}!`);
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : JSON.stringify(error))
  }
};

export default run;
