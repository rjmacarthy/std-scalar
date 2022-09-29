#!/bin/bash
npm version patch
git push origin master
git push --tags
npm publish