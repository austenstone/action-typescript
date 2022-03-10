import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async (): Promise<void> => {
  const token = core.getInput('github-token')
  if (!token) return core.setFailed('No input \'github-token\'')
  
  const octokit = github.getOctokit(token)

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  
  core.info(`Hello, ${login}`);
}

export default run
