import dotenv from 'dotenv';
const result = dotenv.config()

const getInputName = (name: string) => {
  return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`
}

for (const key in result.parsed) {
  if (Object.prototype.hasOwnProperty.call(result.parsed, key)) {
    const value = result.parsed[key];
    process.env[getInputName(key)] = value;
  }
}

process.env.GITHUB_REPOSITORY='owner/repo-name';
process.env.GITHUB_REPOSITORY_OWNER='owner';
process.env.GITHUB_WORKFLOW='My Workflow';
process.env.GITHUB_ACTION='action-name';
process.env.GITHUB_ACTOR='username';
process.env.GITHUB_SHA='1234567890abcdef1234567890abcdef12345678';
process.env.GITHUB_REF='refs/heads/main';
process.env.GITHUB_REF_NAME='main';
process.env.GITHUB_REF_TYPE='branch';
process.env.GITHUB_HEAD_REF='';
process.env.GITHUB_BASE_REF='';
process.env.GITHUB_EVENT_NAME='push';
process.env.GITHUB_RUN_ID=JSON.stringify(15049210062);
process.env.GITHUB_RUN_ATTEMPT=JSON.stringify(1);
process.env.GITHUB_JOB='build';
process.env.GITHUB_RETENTION_DAYS=JSON.stringify(90);

process.env.GITHUB_API_URL='https://api.github.com';
process.env.GITHUB_GRAPHQL_URL='https://api.github.com/graphql';
process.env.GITHUB_SERVER_URL='https://github.com';

(async () => {
  await import('./index');
})();