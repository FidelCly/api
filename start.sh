#!/bin/bash

export NODE_ENV=production
npm run build
node build/src/server.js
