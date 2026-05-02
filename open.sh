#!/bin/bash

read -p "Perplexity Address : " url

npx playwright codegen \
  --target javascript \
  "$url"