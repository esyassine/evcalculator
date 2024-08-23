import { fileURLToPath } from 'url';
import path from 'path';
import { db } from '@vercel/postgres';
import fs from 'fs';
import Papa from 'papaparse';
import pkg from '@next/env';

const { loadEnvConfig } = pkg;

// Definir __filename y __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rootDir = path.resolve(__dirname, '../');
loadEnvConfig(rootDir);

const parseCSV = async (filePath) => {
  const csvFile = fs.readFileSync(path.resolve(filePath), 'utf8');
  return new Promise((resolve) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

async function seed(client) {
  const createBooksTable = await client.sql`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      isbn VARCHAR(255) UNIQUE NOT NULL,
      "title" VARCHAR(255) NOT NULL,
      "author" VARCHAR(255) NOT NULL,
      "year" INT,
      publisher VARCHAR(255),
      "image" VARCHAR(255),
      "description" TEXT,
      "rating" NUMERIC,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log('Created "books" table');

  const bookData = await parseCSV('./books.csv');

  const promises = bookData.map((book, index) => {
    if (!book.isbn) {
      console.error(`Skipping book at index ${index} due to missing ISBN`);
      return Promise.resolve();
    }
    return client.sql`
    INSERT INTO books (isbn, "title", "author", "year", publisher, "image", "description", "rating")
    VALUES (${book.bookId}, ${book.title}, ${book.author}, ${book.publisherDate}, ${book.Publisher}, ${book.coverImg}, ${book.description}, ${book.rating})
    ON CONFLICT (isbn) DO NOTHING;
  `;
  });

  const results = await Promise.all(promises);
  console.log(`Seeded ${results.length} books`);

  return {
    createBooksTable,
    seededBooks: results.length,
  };
}

async function main() {
  const client = await db.connect();
  await seed(client);
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
