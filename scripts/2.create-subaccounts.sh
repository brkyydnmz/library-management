#!/usr/bin/env bash

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

# exit on first error after this point
set -e

echo --------------------------------------------
echo
echo "creating a subaccount 1. under $OWNER"
echo
near create-account sub1.$OWNER --masterAccount=$OWNER --initialBalance "10"

exit 0