const { ApolloServer } = require("apollo-server"); // Import the Apollo Server library

const { importSchema } = require("graphql-import"); // Import graphql-import to load the GraphQL schema from a file

const EtherDataSource = require("./datasource/ethDatasource"); // Import a custom data source for Ethereum data

const typeDefs = importSchema("./schema.graphql"); // Load the GraphQL schema from the schema.graphql file

require("dotenv").config(); // Load environment variables from the .env file

const resolvers = {
  Query: {
    // Resolver function for the etherBalanceByAddress query
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver function for the totalSupplyOfEther query
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver function for the latestEthereumPrice query
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver function for the blockConfirmationTime query
    blockConfirmationTime: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate the Ethereum data source
  }),
});

// Set timeout to 0 (no timeout)
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
