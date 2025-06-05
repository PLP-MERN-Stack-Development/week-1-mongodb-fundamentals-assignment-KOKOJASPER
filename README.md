# 📖 How to Run my MongoDB Scripts

## Prerequisites

- **Node.js** installed on your machine
- **MongoDB** installed and running locally, or access to a MongoDB Atlas cluster
- This project cloned to your local machine

---

## 1. Insert Sample Data

To populate your database with sample book data:

1. Make sure MongoDB is running (`mongod` for local, or connect to Atlas).
2. Open a terminal in your project folder.
3. Run the following command:

   ```
   node insert_books.js
   ```

This will insert the sample books into the `plp_bookstore.books` collection.

---

## 2. Run MongoDB Queries

You can run the queries in `queries.js` using the MongoDB Shell (`mongosh`) or MongoDB Compass:

### Using MongoDB Shell

1. Open your terminal and start the shell:

   ```
   mongosh
   ```

2. Switch to your database:

   ```
   use plp_bookstore
   ```

3. Copy and paste queries from `queries.js` into the shell to execute them.

### Using MongoDB Compass

1. Open MongoDB Compass and connect to your local or Atlas database.
2. Select the `plp_bookstore` database and the `books` collection.
3. Use the "Filter" and "Aggregation" tabs to run queries and pipelines from `queries.js`.

---

## 3. Notes

- All queries are saved in `queries.js` for easy copy-pasting.
- For aggregation pipelines, use the "Aggregation" tab in Compass or paste into the shell.
- For index and explain queries, use the shell for best results.

---

## 4. Troubleshooting

- If you get a connection error, ensure MongoDB is running and your connection string is correct.
- If using Atlas, update the URI in `insert_books.js` to your Atlas connection string.

---
