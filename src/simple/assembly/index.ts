import { PersistentVector, storage, context, RNG, logging, u128, ContractPromiseBatch } from "near-sdk-as";
import { AccountId, Money } from "../../utils";
import { Book, Subscriber, SubscriptionType } from "./model";

@nearBindgen
export class Contract {
  private books: PersistentVector<Book> = new PersistentVector<Book>('s99');
  private subscribers: PersistentVector<Subscriber> = new PersistentVector<Subscriber>('sb99');
  private subscriptionTypes: PersistentVector<SubscriptionType> = new PersistentVector<SubscriptionType>('t99');

  @mutateState()
  init(): void {
    this.assert_init()
    storage.set<AccountId>("owner", context.sender.toString())
    logging.log(`Init Success. Owner is ${storage.getSome<AccountId>("owner")}`)
  }

  /****************Book Functions******************/
  @mutateState()
  addBook(author: String, bookName: String, description: String, genre: String, country: String): Book {
    let newBook = new Book(author, bookName, description, genre,country);
    let index = this.books.push(newBook);
    logging.log(`Success. New book id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newBook;
  }

  @mutateState()
  modifyBook(bookId:i32, author: String, bookName: String, description: String, genre: String, country: String): Book {
    this.assert_bookOwner(this.books[bookId]);
    this.assert_bookId(bookId);
    this.assert_book_is_active(this.books[bookId]);
    let newBook = new Book(author, bookName, description, genre,country);
    newBook.modifiedDate = context.blockTimestamp;
    this.books.replace(bookId,newBook);
    logging.log(`Success. Modified book id: ${bookId} modified by ${storage.getSome<AccountId>("owner")}`);
    return this.books[bookId];
  }

  @mutateState()
  inactivateBook(bookId:i32): Book{
    this.assert_bookOwner(this.books[bookId]);
    this.assert_bookId(bookId);
    this.assert_book_is_active(this.books[bookId]);
    let element = this.books[bookId];
    element.isActive = false;
    element.deletedDate = context.blockTimestamp;
    this.books.replace(bookId,element);
    logging.log(`Success. inactivate book id: ${bookId} inactivated by ${storage.getSome<AccountId>("owner")}`);
    return this.books[bookId];
  }

  getBooksByBookId(bookId:i32): Book | null{
    this.assert_bookId(bookId);
    return this.books[bookId];
  }

  getBooksByAuthorName(authorName:String): Array<Book>{
    let result = new Array<Book>();
    for (let i = 0; i < this.books.length; i++) {
      const element = this.books[i];
      if(element.author==authorName){
        result.push(element);
      }
    }
    return result;
  }

  getBooksByBookName(bookName:String): Array<Book>{
    let result = new Array<Book>();
    for (let i = 0; i < this.books.length; i++) {
      const element = this.books[i];
      if(element.bookName==bookName){
        result.push(element);
      }
    }
    return result;
  }

  getBooksByGenreName(genre:String): Array<Book>{
    let result = new Array<Book>();
    for (let i = 0; i < this.books.length; i++) {
      const element = this.books[i];
      if(element.genre==genre){
        result.push(element);
      }
    }
    return result;
  }

  getBooksByCountryName (country: String): Array<Book>{
    let result = new Array<Book>();
    for (let i = 0; i < this.books.length; i++) {
      const element = this.books[i];
      if(element.country==country){
        result.push(element);
      }
    }
    return result;
  }

  getAllBooks(): Array<Book>{
    let result = new Array<Book>();
    for (let i = 0; i < this.books.length; i++) {
      const entry = this.books[i];
      result.push(entry);
    }
    return result;
  }

  

/*****************Subscription Functions*****************/
  @mutateState()
  createSubscriber(): Subscriber {
    let newSubscriber = new Subscriber();
    let index = this.subscribers.push(newSubscriber);
    logging.log(`Success. New Subscriber id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newSubscriber;
  }

  @mutateState()
  buySubscription(subscriberId:i32,subscriptionTypeId:i32): Subscriber {
    this.assert_enoughDeposit(this.subscriptionTypes[subscriptionTypeId].price)
    this.assert_subscriberId(subscriberId);
    this.assert_subscriptionTypeId(subscriptionTypeId);
    const sOwner: AccountId = storage.getSome<AccountId>("owner")
    ContractPromiseBatch.create(sOwner).transfer(this.subscriptionTypes[subscriptionTypeId].price);
    let buyyerSubscriber = this.subscribers[subscriberId];
    let readingBookCount = this.subscriptionTypes[subscriptionTypeId].readingBookCount;
    buyyerSubscriber.remainingReadingCount = buyyerSubscriber.remainingReadingCount + readingBookCount;
    buyyerSubscriber.modifiedDate = context.blockTimestamp;
    this.subscribers.replace(subscriberId,buyyerSubscriber);
    logging.log(`Success. New subscriber id: ${subscriberId} added by ${storage.getSome<AccountId>("owner")}`);
    return buyyerSubscriber;
  }

  @mutateState()
  readBook(subscriberId:i32, bookId:i32): Book{
    this.assert_subscriberId(subscriberId);
    this.assert_bookId(bookId);
    this.assert_remainingReadingCount(subscriberId);
    let element = this.subscribers[subscriberId];
    element.remainingReadingCount = element.remainingReadingCount-1;
    element.modifiedDate = context.blockTimestamp;
    this.subscribers.replace(subscriberId,element);
    logging.log(`Success. Playing book id: ${bookId} played by ${storage.getSome<AccountId>("owner")}`);
    return this.books[bookId];
  }

  getSubscribersBySubscriberId(subscriberId:i32): Subscriber | null{
    this.assert_subscriberId(subscriberId);
    return this.subscribers[subscriberId];
  }

  getSubscribersByAccountId(AccountId:AccountId): Array<Subscriber>{
    let result = new Array<Subscriber>();
    for (let i = 0; i < this.subscribers.length; i++) {
      const element = this.subscribers[i];
      if(element.owner==AccountId){
        result.push(element);
      }
    }
    return result;
  }

  getAllSubscribers(): Array<Subscriber>{
    let result = new Array<Subscriber>();
    for (let i = 0; i < this.subscribers.length; i++) {
      const entry = this.subscribers[i];
      result.push(entry);
    }
    return result;
  }

/*****************Subscription Types Functions*****************/
  @mutateState()
  addSubscriptionType(typeCode: String, price: Money, readingBookCount: i32): SubscriptionType {
    let newSubscriptionType = new SubscriptionType(typeCode, price, readingBookCount);
    let index = this.subscriptionTypes.push(newSubscriptionType);
    logging.log(`Success. New Subscription Type id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newSubscriptionType;
  } 

  @mutateState()
  modifySubscriptionType(subscriptionTypeId:i32, typeCode: String, price: Money, readingBookCount: i32): SubscriptionType {
    // this.assert_subscriptionOwner(this.subscriptionTypes[subscriptionTypeId]);
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    // this.assert_subscription_is_active(this.subscriptionTypes[subscriptionTypeId]);
    let newSubscriptionType = new SubscriptionType(typeCode, price, readingBookCount);
    newSubscriptionType.modifiedDate = context.blockTimestamp;
    this.subscriptionTypes.replace(subscriptionTypeId,newSubscriptionType);
    logging.log(`Success. Modified Subscription Type id: ${subscriptionTypeId} modified by ${storage.getSome<AccountId>("owner")}`);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  @mutateState()
  inactivateSubscriptionType(subscriptionTypeId:i32): SubscriptionType{
    // this.assert_subscriptionOwner(subscriptionTypeId);
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    // this.assert_subscription_is_active(subscriptionTypeId);
    let element = this.subscriptionTypes[subscriptionTypeId];
    element.isActive = false;
    element.deletedDate = context.blockTimestamp;
    this.subscriptionTypes.replace(subscriptionTypeId,element);
    logging.log(`Success. inactivate Subscription Type id: ${subscriptionTypeId} inactivated by ${storage.getSome<AccountId>("owner")}`);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  getSubscriptionTypesByTypeID(subscriptionTypeId:i32): SubscriptionType | null{
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  getAllSubscriptionTypes(): Array<SubscriptionType>{
    let result = new Array<SubscriptionType>();
    for (let i = 0; i < this.subscriptionTypes.length; i++) {
      const entry = this.subscriptionTypes[i];
      result.push(entry);
    }
    return result;
  }

  /*****************Assert Functions*****************/
  private assert_init(): void {
    assert(!storage.contains("owner"), `Contract initialized before! storageOwner:${storage.getSome<AccountId>("owner")}`)
  }

  private assert_bookOwner(book: Book): void {
    assert(storage.getSome<AccountId>("owner") == book.owner
      , `storageOwner:${storage.getSome<AccountId>("owner")}, book.owner:${book.owner} : Only the owner of this raffle may call this method`);
  }
  
  private assert_bookId(id: i32): void {
    assert(this.books.containsIndex(id), 'Book not exists');
  }

  private assert_book_is_active(book: Book): void {
    assert(book.isActive, 'Book is inactive');
  }

  private assert_subscriberId(id: i32): void {
    assert(this.subscribers.containsIndex(id), 'Subscriber not exists');
  }

  private assert_subscriptionTypeId(id: i32): void {
    assert(this.subscriptionTypes.containsIndex(id), 'Subscription Type not exists');
  }

  private assert_enoughDeposit(price: Money): void {
    assert(context.attachedDeposit >= price, `attachedDeposit:${context.attachedDeposit}, price:${price} Please send enough NEAR!`)
  }

  private assert_remainingReadingCount(subscriberId: i32): void {
    assert(0 < this.subscribers[subscriberId].remainingReadingCount, `You have no remaining reading count!!`)
  }

}