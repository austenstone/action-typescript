# TypeScript Action Template

This repository serves as a [template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) for TypeScript [Actions](https://docs.github.com/en/actions).

## Development

Run `npm run dev` for a hot-reload dev environment.

## Build

Run `npm run build` to build the project with `ncc`. The build artifacts will be stored in a single file `dist/index.js`.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://karma-runner.github.io).

## Further help

To get more help on the Actions see [documentation](https://docs.github.com/en/actions).

## Usage
Create a workflow (eg: `.github/workflows/run.yml`). See [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

#### Default Workflow
```yml
name: "Add to Project"
on:
  workflow_dispatch:

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: austenstone/action-typescript@main
```

## Input Settings
Various inputs are defined in [`action.yml`](action.yml):

| Name | Description | Default |
| --- | - | - |
| github&#x2011;token | Token to use to authorize. | ${{&nbsp;github.token&nbsp;}} |
