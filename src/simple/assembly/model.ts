import { Context } from "near-sdk-as";
import { AccountId, Timestamp, Money} from "../../utils";


@nearBindgen
export class Book {
    owner: AccountId = Context.sender;
    author: String;
    bookName: String;
    description: String;
    genre: String;
    country: String;
    isActive: bool = true;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;
    deletedDate: Timestamp;

    constructor(_author: String,
                _bookName: String,
                _description: String,
                _genre: String,
                _country: String) {
        this.author = _author;
        this.bookName = _bookName;
        this.description = _description;
        this.genre = _genre;
        this.country = _country;
    };
}

@nearBindgen
export class Subscriber {
    owner: AccountId = Context.sender;
    subscriptionType: i32 = 0;
    remainingReadingCount: i32 = 0;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;

    constructor(/*_subscriptionType: i32,
                _remainingReadingCount: i32*/){
        /* this.subscriptionType = _subscriptionType;
        this.remainingReadingCount = _remainingReadingCount;*/
    };
}

@nearBindgen
export class SubscriptionType {
    owner: AccountId = Context.sender;
    typeCode: String;
    price: Money;
    readingBookCount: i32;
    isActive: bool = true;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;
    deletedDate: Timestamp;

    constructor(_typeCode: String,
                _price: Money,
                _readingBookCount: i32,
                ){
        this.typeCode = _typeCode;
        this.price = _price;
        this.readingBookCount = _readingBookCount;
    };
}