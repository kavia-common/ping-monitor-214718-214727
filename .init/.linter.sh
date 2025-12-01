#!/bin/bash
cd /home/kavia/workspace/code-generation/ping-monitor-214718-214727/web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

