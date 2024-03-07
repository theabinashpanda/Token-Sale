# Token Sale Project

This project aims to implement a token sale for an ERC20 token with specific functionalities as outlined in the assignment. The goal is to raise funds of 2 ETH by selling ERC20 tokens to investors.

## Project Description
- Investors can participate in the token sale by sending ETH.
- Upon purchase, tokens are immediately distributed to the respective investors. 
- The token sale automatically stops once the minimum fundraising goal of 2 ETH is achieved, and further token sale is disallowed.
- Additionally, the token sale concludes after 32 blocks are produced post-contract deployment. 
- After the token sale ends, there's a provision to transfer all ETH from the smart contract to a specific external address.
- This project ensures a streamlined process for fundraising through token sale while maintaining security and efficiency.

## UML Design
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLPVY-Cs47_FfnYu5vlTG3beAKjRBdTasz1U4fAmBIsBKUn9efui6KbEDhIzpzvObXNBicztuPusE_FxpVyP-PtIHEeoPoEn_HjJ3R_X7ddspmW0O0nBIOz48no9f6JBK1dv3IpBBQDfH_m6fayQ9ISCTYLFDHLSHR77y1IUYq3p6HuedZpnVwCHvHhbZgG8iyM9ewm3dGjGEenpF3P_y8XSWu6h0oqsad2rGoanYmg9HofAPPHtGB9Ceb90UOPFcDroFFLhuhRzDw2jIUSZ2fZn7Mo5O9OWAbqKmv7YoK6g_596b89MQcFdEZ4a8yn5HdSK9GZEpWRiwfmAhhGiKosSx4NXNKsr0ltS1EfmdHvCLn_UVhCHdv2_l15D_QET57bOSz2YHtWahCGxA2dNRx_zBcwPcnI551Tr9Ffx2Af0dg5ycT6mfv74b1OKkNOMRe7aekJQKVtc4XCHHhxZvsZEuRqKUQIwr5T7eOKcR5qM1JkxGRD0YzWIHdYAYrr4qbIKBTFzUCAOE5MCJgdz4W_pCqnfJfYwX5EKqXR---lKNuS9cjbNMbA-XuIJ73iYTSwtWbcXTGGqpqjTpHqahVmjA2T5KL7_QWRXnvyQucDJ3ELZsr1VvB4VeR1NpDL8-OlAXVuJfPYOZaNTnlNiRfLnScUplOKwMoUmZAysC-3RU_NGtmmFVPVrJ2cywrCL8OgRfAsmBaKWzkRTsRFAuL4FeAw3_dswzHCBY3V3uztCjndjDM7OkUojgKMPsXMOrBeEiY1dWziYnnrDAP7dmGtO2y9WK8iyUyz4-ia7r2D8k8QFap-IpUBNwJnPJbV9RFumNMyMgo6qGQuli6GndoRJpIy-i6vEdRzWcLMQmQEggiWarVI8Hbvl0Cpu4LMr2BkIPwh-3pDNyrlGbJMrB6Lw8ChNq1n3HZousSxN8r3xg-_Pylr5s_BS-wY4k-rCL9ckjIYA2zrKvBxARKMeZJyW6FtlL1yoIKuy-eBfzzU1-70WV8zP95ZMalP4ol4K0i9l7F-GAS9mBdJTi2ZsbKV2Q5OlzaBEnOiENQ9RuzwwDidMZyrRWCRGfGbrNwAuKVaHXY6XFao-TCYK5aNLgAZrIUJRR98mTMvLC1eeQFXjvHzRq-MDQ5iQ-XpRe_PWpiTL_xCWp3-0LZ6r6z-ht7WB6a2yDQth67S3ksylQdDdkttjz-rlrckeDCVN-wIM8kGG9KYkNbAJOc_zLfWJoYdVssOQV0i9hJuyrPEJFH1MOh0YpovHyF1SR7uaJwQAIvGkDVSCUM1NxnbVSBnSwW1tUR1czTJ_yEzu3ERdw2feVQQrfUvn6yskW83m3dbMvkn_)

## Getting started
- Clone the repository by running the following commands.

```
git clone https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale
```

- Setup the hardhat by following link: [Click here](https://hardhat.org/hardhat-runner/docs/getting-started)

- Install ethers by running the following command:
```
npm i ethers
```

## Unit Testing
- Run the following command:
```
npx hardhat test
```

## Deployment

- Create a .env file and add the necessary keys and IDs according to sample.env file.

- Don't forget to add .env to your .gitignore.

Then, run the following command:

```
npx hardhat run --network <network name> scripts/deploy.js
```

#### Note: 

- To run in localhost, you have to run the following commmand, in a separate terminal: 
```
npx hardhat node
```

## Verification

- To verify the contract, run the following command
```
npx hardhat verify --network <network name> <Deployed Address> <Args1> <Args2> ...
```

## Code Analysis

### Code coverage
- To install the code coverage, run the following command
```
npm i coverage
```
- To generate a code coverage report, run the following command
```
npx hardhat coverage
```

### Slither analysis
- To install slither, run the following command
```
pip3 install slither-analyzer
```
- Slither require Python 3.8+.
- To run slither, run the following command:
```
slither .
```

## Supported Documents

### Deployment
- ERC20Token contract is deployed at [0xcdf82b0a207Bc428d61ec7ec88C12348AdD30408](https://sepolia.etherscan.io/address/0xcdf82b0a207Bc428d61ec7ec88C12348AdD30408)
- TokenSale contract is deployed at [0x118f957fD2a084A6644a62F2134d668ed9D649f7](https://sepolia.etherscan.io/address/0x118f957fD2a084A6644a62F2134d668ed9D649f7)

### Verification
- [Verified ERC20Token contract link ](https://sepolia.etherscan.io/address/0xcdf82b0a207Bc428d61ec7ec88C12348AdD30408#code)
- [Verified TokenSale contract Link](https://sepolia.etherscan.io/address/0x118f957fD2a084A6644a62F2134d668ed9D649f7#code)

### Code Analysis

#### Code coverage report
![Coverage Report](https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale/uploads/4fb28e6fb60c2c1748aa678bf0e7ce50/image.png)

#### Slither Analysis
![Slither analysis](https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale/uploads/079bbe9921cede4fc9712ce3ede1f3d7/image.png)