<div align="center">
    <h3 align="center">Library Management - Near Protocol</h3>
</div>

![](images/near-logo.png)

<details>
  <summary>Table of Contents</summary>
<ol>
  <li><a href="#roles">Roles</a>
  	<ul>
  		<li><a href="#library Officer Usage">Library Officer Usage</a></li>
    	<li><a href="#reader usage">Reader usage</a></li>
   	</ul>
  </li>
  <li><a href="#models">Models</a>
    <ul>
      	<li><a href="#book">Book</a></li>
    	<li><a href="#subscriptionType">SubscriptionType</a></li>
        <li><a href="#subscriber">Subscriber</a></li>
    </ul>
  </li>
  <li><a href="#deploy">Deploy</a></li>
  <li><a href="#creating Accounts">Creating Accounts</a></li>
  <li><a href="#usage">Usage</a></li>
</ol>
</details>

Books have a great place in our lives. The library system will also change in the developing world. I thought about how this process would be on BlockChain. And I came to this conclusion:

An application where you pay as much as the number of books you read.

# Roles
## Library Officer Usage
- Create books with book name, author name, genre, description etc. fields. Then may modify, inactivate them.
- EDetermines and creates membership types.

## Reader usage
- Creates membership, buy subscription types so buys the right to read books. Also may checks/list books, account details.

# Models
## Book
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| author | String |
| bookName | String |
| Description | String |
| genre | String |
| country | String |
| isActive | bool |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
| DeletedDate | Timestamp |
##  SubscriptionType
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| typeCode | String |
| price | Money |
| readingBookCount | i32 |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
| DeletedDate | Timestamp |
##  Subscriber
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| subscriptionType | i32 |
| remainingListenBookCount | i32 |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |

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

# Usage
|Details|How to Call|
|---|---|
Initializing|`near call $CONTRACT init --accountId your-account-here.testnet`|
Adding Book|`near call $CONTRACT addBook '{"author":"Sabahattin Ali","bookName":"Kürk Mantolu Madonna","description":"A mysterious book from Sabahattin Ali","genre":"Literature","country":"TR"}' --accountId your-account-here.testnet`|
Modifying Book|`near call $CONTRACT modifyBook '{"bookId":0,"author":"Sabahattin Ali","bookName":"Kürk Mantolu Madonna","description":"modificated A mysterious book from Sabahattin Ali","genre":"Literature" "country":"TR"}' --accountId your-account-here.testnet`|
Inactivating Book|`near call $CONTRACT inactivateBook '{"bookId":0}' --accountId your-account-here.testnet`|
Getting All Books|`near view $CONTRACT getAllBooks`|
Getting Books With Book Id Parameter|`near view $CONTRACT getBooksByBookId '{"bookId":0}'`|
Getting Books With Author Name Parameter|`near view $CONTRACT getBooksByAuthorName '{"authorName":"Sabahattin Ali"}'`|
Getting Books With Book Name Parameter|`near view $CONTRACT getBooksByBookName '{"bookName":"Kürk Mantolu Madonna"}'`|
Getting Books With Genre Parameter|`near view $CONTRACT getBooksByGenreName '{"genre":"Literature"}'`|
Getting Books With Country Parameter|`near view $CONTRACT getBooksByCountryName '{"country":"TR"}'`|
Creating Subscriber|`near call $CONTRACT createSubscriber --accountId sub1.your-account-here.testnet`|
Buying Subscription|`near call $CONTRACT buySubscription '{"subscriberId":0,"subscriptionTypeId":0}' --accountId sub1.your-account-here.testnet --deposit 3`|
Getting All Subscribers|`near call $CONTRACT createSubscriber --accountId sub1.your-account-here.testnet`|
Getting Subscribers With Subscriber Id Parameter|`near view $CONTRACT getSubscribersBySubscriberId '{"subscriberId":0}'`|
Getting Subscribers With Account Id Parameter|`near view $CONTRACT getSubscribersByAccountId '{"AccountId":"sub1.your-account-here.testnet"}'`|
Adding Subscription Type|`near call $CONTRACT addSubscriptionType '{"typeCode":"Basic","price":"500000000000000000000000","listenBookCount":500}' --accountId your-account-here.testnet`|
Modifying Subscription Type|`near call $CONTRACT modifySubscriptionType '{"subscriptionTypeId":3,"typeCode":"Old Type MODIFIED","price":"100000000000000000000000","listenBookCount":100}' --accountId your-account-here.testnet`|
Getting All Subscription Type|`near view $CONTRACT getAllSubscriptionTypes '{}'`|
Getting All Subscription Type By Type Id|`near view $CONTRACT getSubscriptionTypesByTypeID '{"subscriptionTypeId":2}'`|




