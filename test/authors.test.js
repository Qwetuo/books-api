const express = require("express");
const request = require("supertest");

const MongodbMemoryServer = require("mongodb-memory-server").default;
const mongod = new MongodbMemoryServer();
const mongoose = require("mongoose");
const Author = require("../models/author");

const app = require("../app");

let author1Id;

async function addFakeAuthors() {
  const author1 = new Author({
    name: "paulo",
    age: 49
  });

  const author1save = await author1.save();
  author1Id = author1save._id

  const author2 = new Author({
    name: "john",
    age: 50
  });

  const author2save = await author2.save();
  author2Id = author2save._id
}

beforeAll(async () => {
  jest.setTimeout(120000);
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

beforeEach(async () => {
  mongoose.connection.db.dropDatabase();
  await addFakeAuthors();
});

test("GET /authors", async () => {
  const response = await request(app).get("/authors");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
});

test("GET /authors/:id", async () => {
  const response = await request(app).get(`/authors/${author1Id}`);
  console.log(response.body)
  console.log(author1Id)
  expect(response.status).toBe(200);
  expect(response.body.name).toEqual("paulo")
});