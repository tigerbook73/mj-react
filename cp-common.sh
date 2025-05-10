#!/bin/bash

# cp-common.sh - Common functions and variables for the project

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -rf $DIR/src/common/*
cp -rf $DIR/../mj-server/src/common/* $DIR/src/common
