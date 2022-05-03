#!/usr/bin/env bash
set -e

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo 'About to call addBook() on the contract'
echo near call $CONTRACT addBook '{"author":"$author","bookName":"$bookName","description":"$description","genre":"$genre","country":"$country"}' --accountId $OWNER
echo
echo \$NEAR_ENV is $NEAR_ENV
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$author is [ $author ] '(the author)'
echo \$bookName is [ $bookName ] '(the bookName)'
echo \$description is [ $description ] '(the description)'
echo \$genre is [ $genre ] '(the genre)'
echo \$country is [ $country ] '(the country)'

echo
near call $CONTRACT addBook '{"author":"'"$author"'","bookName":"'"$bookName"'","description":"'"$description"'",,"genre":"'"$genre"'","country":"'"$country"'"}' --accountId $OWNER

echo
echo 'About to call addSubscriptionType() on the contract'
echo near call $CONTRACT addSubscriptionType '{"typeCode":"$typeCode","price":"$price","readingBookCount":$readingBookCount}' --accountId $OWNER
echo \$NEAR_ENV is $NEAR_ENV
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$typeCode is [ $typeCode ] '(type code like basic, premium,diamond )'
echo \$price is [ $price ] '(the price as yoctoNEAR)'
echo \$readingBookCount is [ $readingBookCount ] '(the readingBookCount like 500, 750 ,100)'

echo
near call $CONTRACT addSubscriptionType '{"typeCode":"'"$typeCode"'","price":"'"$price"'","readingBookCount":'$readingBookCount'}' --accountId $OWNER

exit 0
