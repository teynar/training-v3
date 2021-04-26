const { OGM } = require("@neo4j/graphql-ogm");
const neo4j = require("neo4j-driver");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

// Load contents of .env as environment variables
dotenv.config();

// Load GraphQL type definitions from schema.graphql file
const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"))
  .toString("utf-8");

// Create Neo4j driver instance
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const ogm = new OGM({ typeDefs, driver });
const Order = ogm.model("Order");

const Book = ogm.model("Book");

const reportOrders = async () => {
  const selectionSet = `
    {
      orderID
      placedAt
      shipTo {
        address
      }
      books {
        title
        isbn
        price
      }
    }
  `;

  const dailyOrders = await Order.find({
    selectionSet,
  });

  console.log(JSON.stringify(dailyOrders, null, 2));
};

reportOrders();
