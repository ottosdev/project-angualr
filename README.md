# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run

on:

# Triggers the workflow on push or pull request events but only for the main branch

push:
branches: [develop]

# pull_request:

# branches: [develop]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel

jobs:

# This workflow contains a single job called "build"

build: # The type of runner that the job will run on
runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: actions/cache@v3
        id: yarn-cache
        with:
          path: |
            ~/cache
            !~/cache/exclude
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: install
        run: yarn install

      - name: lint
        run: yarn lint

      - name: build
        run: yarn build
