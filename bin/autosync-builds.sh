#!/bin/sh

TOOLS=$(dirname $(readlink -f $0))

auto-sync

echo "watching grammar files..."
${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/grammar" "${TOOLS}/build-parser-states.sh" &

${APP_TOOLS}/watcher/watch.sh "${PROJECT_ROOT}/src" "${TOOLS}/build-to-dist.sh"
