#!/bin/bash

# Update the components index to use the client version of the components.
sed -i '1,1s/^/"use client"; /' ./packages/headless-stepper/components/dist/index.mjs
sed -i '1,1s/^/"use client"; /' ./packages/headless-stepper/components/dist/index.js
