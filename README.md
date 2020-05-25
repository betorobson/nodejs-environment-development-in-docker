# nodejs-environment-development-in-docker

## Why do you need it?
Enforce everyone working in the same development environment, preventing any mistake of env config.

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

## Branch prefix names for build workflow with bump version
 - Major version [/bump/major/]: `user/bump/major/any-feature-name-here`
 - Minor version (default): It does not need a prefix `user/any-feature-name-here`
 - Patch version [/bump/patch/]: `user/bump/patch/any-patch-name-here`

## Skipping bild workflow, Branch prefix name or commit message
 - skiping Build with [/skip/build/]: `user/skip/build/any-name-here`

test build 11
