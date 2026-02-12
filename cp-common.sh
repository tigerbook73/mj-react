#!/bin/bash

# cp-common.sh - Common functions and variables for the project

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -rf $DIR/src/common/*

# SRC_DIR is "$DIR/../shared/src" or "$DIR/../mj/shared/src" if the former doesn't exist
if [ -d "$DIR/../shared/src" ]; then
    SRC_DIR="$DIR/../shared/src"
else
    SRC_DIR="$DIR/../mj/shared/src"
fi

cp -rf $SRC_DIR/* $DIR/src/common
