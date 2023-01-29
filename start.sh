#!/bin/bash

export NODE_ENV=production
npm run db:push
npm run build
node build/src/server.js
