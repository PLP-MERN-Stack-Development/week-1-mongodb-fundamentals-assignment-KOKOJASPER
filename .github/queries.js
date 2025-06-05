// task 1 database setup

const dbName = "plp_bookstore";
const collectionName = "books";

// task 2 Basic CRUD operations

db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.5,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.5,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne",
  },
]);

// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId('6840f6d78f36641043fcc995'),
//     '1': ObjectId('6840f6d78f36641043fcc996'),
//     '2': ObjectId('6840f6d78f36641043fcc997'),
//     '3': ObjectId('6840f6d78f36641043fcc998'),
//     '4': ObjectId('6840f6d78f36641043fcc999'),
//     '5': ObjectId('6840f6d78f36641043fcc99a'),
//     '6': ObjectId('6840f6d78f36641043fcc99b'),
//     '7': ObjectId('6840f6d78f36641043fcc99c'),
//     '8': ObjectId('6840f6d78f36641043fcc99d'),
//     '9': ObjectId('6840f6d78f36641043fcc99e')
//   }
// }

//Find all books in a specific genre

db.books.find({ genre: "Fiction" });

//Find books published after a certain year

db.books.find({ published_year: { $gt: 1950 } });

//Find books by a specific author

db.books.find({ author: "George Orwell" });

//Update the price of a specific book

db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });

//Delete a book by its title

db.books.deleteOne({ title: "The Hobbit" });

//Task 3: Advanced Queries

// A query to find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

//query that Use projection to return only the title, author, and price fields in your queries

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

//query Implement sorting to display books by price (both ascending and descending)

// Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// Sort books by price in descending order
db.books.find().sort({ price: -1 });

// Use the `limit` and `skip` methods to implement pagination (5 books per page)

// Page 1: Get the first 5 books
db.books.find().limit(5);

// Page 2: Skip the first 5 books, then get the next 5
db.books.find().skip(5).limit(5);

// Page 3: Skip the first 10 books, then get the next 5
db.books.find().skip(10).limit(5);

//Task 4: Aggregation Pipeline

// Aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
    },
  },
]);

// Aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
]);

// Aggregation pipeline to group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10],
        },
      },
      count: { $sum: 1 },
    },
  },
  { $sort: { "_id.decade": 1 } },
]);

//Task 5: Indexing
// Create an index on the 'title' field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on 'author' and 'published_year'
db.books.createIndex({ author: 1, published_year: 1 });

// Example: Find books by a specific author and published year, with explain()
db.books
  .find({ author: "George Orwell", published_year: 1949 })
  .explain("executionStats");
