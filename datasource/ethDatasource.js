const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik Buterin's Ethereum address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; 

// Etherscan Data Source class that extends Apollo RESTDataSource
class EtherDataSource extends RESTDataSource {
  
  constructor() {
    super();
    
    // Base URL for Etherscan API 
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    
    // Get account balance for the eth_address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    
    // Get total Ether supply
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getLatestEthereumPrice() {
    
    // Get latest Ether price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    
    // Get block confirmation time estimate
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export Etherscan Data Source module
module.exports = EtherDataSource;