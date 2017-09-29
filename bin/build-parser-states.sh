#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))

SOURCE="${ROOT}/grammar/index.js"
TARGET="${ROOT}/src/parser/states.json"


"${ROOT}/node_modules/.bin/libcore-parser-lalr" "${SOURCE}" "${TARGET}"

