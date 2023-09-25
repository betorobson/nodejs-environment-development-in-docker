# nodejs-environment-development-in-docker

![ci](https://github.com/betorobson/nodejs-environment-development-in-docker/workflows/ci/badge.svg?branch=master)

## Why do you need it?
Enforce everyone to work having the same environment at local machine, preventing any mistake of env config.

## What do you need?
 - Docker, for sure
 - NodeJS? just if you like it
 - VSCode!

## How to test it?
 - Clone this project
 - Add project folder into your VSCode
 - Run in terminal
```
$ docker-compose up
```
 - Run Debug called: `My NodeJS: Attach to Docker`
 - Most important, pay me a beer 🍺 !

## I do not have VSCode, it will work?
Yeah, for sure it will work however, debugger breakpoints no!
So, just run in terminal.
```
$ docker-compose up
```

## Pull request title for bump new versions must contain:
 - Major version [/bump/major/]: `Develop /bump/major/`
 - Minor version [/bump/minor/]: `Develop /bump/minor/`
 - Patch version [/bump/patch/]: `Fix title /bump/patch/`

## Skipping bild workflow commit message must contain:
 - [/skip/build/]: `message commit /skip/build/ message commit`

test build 234
