#!/bin/sh

TOOLS=$(dirname $(readlink -f $0))
ROOT=$(dirname $(dirname $(readlink -f $0)))
CURRENT_DIR=$(pwd)

auto-sync

cd "${ROOT}"

echo "watching grammar files..."
${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/grammar" "${TOOLS}/build-parser-states.sh" &

echo "watching src demo..."
${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/src" "${TOOLS}/build-devel.sh" &




npm run start
cd "${CURRENT_DIR}"



