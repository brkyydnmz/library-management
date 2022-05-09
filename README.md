<div align="center">
    <h3 align="center">Library Management - Near Protocol</h3>
</div>

![](images/near-logo.png)

<details>
  <summary>Table of Contents</summary>
<ol>
  <li><a href="#roles">Roles</a>
  	<ul>
  		<li><a href="#library-officer-usage">Library Officer Usage</a></li>
    	<li><a href="#reader-usage">Reader Usage</a></li>
   	</ul>
  </li>
  <li><a href="#models">Models</a>
    <ul>
      	<li><a href="#book">Book</a></li>
        <li><a href="#subscriber">Subscriber</a></li>
        <li><a href="#subscription-type">SubscriptionType</a></li>
    </ul>
  </li>
  <li><a href="#deploy">Deploy</a></li>
  <li><a href="#creating-accounts">Creating Accounts</a></li>
  <li><a href="#terminal">Terminal</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#links">Links</a></li>
</ol>
</details>

Books have a great place in our lives. The library system will also change in the developing world. I thought about how this process would be on BlockChain. And I came to this conclusion:

An application where you pay as much as the number of books you read.

You can find the link of the loom video and Patika at the bottom.
# Roles
## Library Officer Usage
- Create books with book name, author name, genre, description etc. fields. Then may modify, inactivate them.
- EDetermines and creates membership types.

## Reader Usage
- Creates membership, buy subscription types so buys the right to read books. Also may checks/list books, account details.

# Models
## Book
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| author | String |
| bookName | String |
| description | String |
| genre | String |
| country | String |
| isActive | bool |
| createdDate | Timestamp |
| modifiedDate | Timestamp |
| deletedDate | Timestamp |
##  Subscriber
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| subscriptionType | i32 |
| remainingReadingBookCount | i32 |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
##  SubscriptionType
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| typeCode | String |
| price | Money |
| readingBookCount | i32 |
| isActive | bool |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
| DeletedDate | Timestamp |

# Deploy 
```
yarn
yarn build:release
near dev-deploy ./build/release/simple.wasm
export CONTRACT=<AccountId>
echo $CONTRACT
```

# Creating Accounts
```ts
near create-account <subAccName1>.<AccountName>.testnet --masterAccount <AccountName>.testnet --initialBalance 10
near create-account <subAccName2>.<AccountName>.testnet --masterAccount <AccountName>.testnet --initialBalance 10

near state <subAccName1>.<AccountName>.testnet
near state <subAccName2>.<AccountName>.testnet
near state <AccountName>.testnet

near send <AccountName>.testnet <subAccName1>.<AccountName>.testnet 10
near delete <subAccName1>.<AccountName>.testnet <AccountName>.testnet
near delete <subAccName2>.<AccountName>.testnet <AccountName>.testnet
```

# Terminal

*This window is used to compile, deploy and control the contract*
- Environment
  ```sh
  export CONTRACT=        # depends on deployment
  export OWNER=           # any account you control and create, add books and subscription types
  export USER=            # any account buy subscription to reading books


  # for example
  # export CONTRACT=dev-1650345345591-4501142324234
  # export OWNER=your-account-here.testnet
  # export USER=sub1.your-account-here.testnet

  ```

- Commands

  _Owner scripts_
  ```sh
  1.dev-deploy.sh           # cleanup, compile and deploy contract
  2.create-subaccounts.sh   # generate a summary report of the contract state
  3.adminRole.sh       
  6.report.sh
  ```

  _Public scripts_
  ```sh
  4.userRole.sh         
  5.readBook.sh    
  ```

# Usage
|Details|How to Call|
|---|---|
Initializing|`near call $CONTRACT init --accountId your-account-here.testnet`|
Adding Book|`near call $CONTRACT addBook '{"author":"Suzanne Collins","bookName":"The Hunger Games","description":"The first book in The Hunger Games series","genre":"Adventure","country":"USA"}' --accountId your-account-here.testnet`|
Modifying Book|` near call $CONTRACT modifyBook '{"bookId":0,"author":"Suzanne Collins","bookName":"Catching Fire","description":"The second book in The Hunger Games series","genre":"Adventure","country":"USA"}' --accountId your-account-here.testnet`|
Inactivating Book|`near call $CONTRACT inactivateBook '{"bookId":0}' --accountId your-account-here.testnet`|
Getting All Books|`near view $CONTRACT getAllBooks`|
Getting Books With Book Id Parameter|`near view $CONTRACT getBooksByBookId '{"bookId":0}'`|
Getting Books With Author Name Parameter|`near view $CONTRACT getBooksByAuthorName '{"authorName":"Suzanne Collins"}'`|
Getting Books With Book Name Parameter|`near view $CONTRACT getBooksByBookName '{"bookName":"The Hunger Games"}'`|
Getting Books With Genre Parameter|`near view $CONTRACT getBooksByGenreName '{"genre":"Literature"}'`|
Getting Books With Country Parameter|`near view $CONTRACT getBooksByCountryName '{"country":"TR"}'`|
Creating Subscriber|`near call $CONTRACT createSubscriber --accountId sub1.your-account-here.testnet`|
Buying Subscription|`near call $CONTRACT buySubscription '{"subscriberId":0,"subscriptionTypeId":0}' --accountId sub1.your-account-here.testnet --deposit 3`|
Read Book | `near call $CONTRACT readBook '{"subscriberId":0,"bookId":0}' --accountId sub1.your-account-here.testnet`|
Getting All Subscribers|`near view $CONTRACT getAllSubscribers`|
Getting Subscribers With Subscriber Id Parameter|`near view $CONTRACT getSubscribersBySubscriberId '{"subscriberId":0}'`|
Getting Subscribers With Account Id Parameter|`near view $CONTRACT getSubscribersByAccountId '{"AccountId":"sub1.your-account-here.testnet"}'`|
Adding Subscription Type|`near call $CONTRACT addSubscriptionType '{"typeCode":"Basic","price":"500000000000000000000000","readingBookCount":500}' --accountId your-account-here.testnet`|
Modifying Subscription Type|`near call $CONTRACT modifySubscriptionType '{"subscriptionTypeId":3,"typeCode":"Old Type MODIFIED","price":"100000000000000000000000","readingBookCount":100}' --accountId your-account-here.testnet`|
Inactivating Subscription Type|`near call $CONTRACT inactivateSubscriptionType '{"subscriptionTypeId":0}' --accountId your-account-here.testnet`|
Getting All Subscription Type|`near view $CONTRACT getAllSubscriptionTypes '{}'`|
Getting All Subscription Type By Type Id|`near view $CONTRACT getSubscriptionTypesByTypeID '{"subscriptionTypeId":2}'`|

# Links
- [Loom Video link](https://www.loom.com/share/0c71d73b0f8641919e2f87c9f4a1ded1)
- [Patika.dev account](https://app.patika.dev/brkyydnmz)

