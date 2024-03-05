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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLRVY-Cs47xFNp7G5vlRXNBGKfQsN7P9IkXUl2HXMreMerYJH3rPCfBiR6XxVtknB3koOkyFw5ioCzzePlJD9t_IXYXJvdmYjtzXPk0UzoZetnC0W6juKAmY1g4YYf4jHstj7-2Xt7AM1UPlOFPiK0d2OLUAp30fT1Jt4PuZE2BqV8L7XiUU-T_9X0c3QaSoX4Lo5AYQGfSIjBci4oiK1coSFh1YeuZGErGAQLGeh9WijNNU0A5KeTR01CLdf5S2ZyEUs7LgNAukUNG1YMzWAoLt05dxeXWgXiSkfEueuqHhy9gvxivCBSWQ0N99sOwX0YduoOPtiysaq4QLcP6TxKq5dbDvfNvjI-tYWhdFLdSVlzt8BoZUCFnsvj5EoVnopc3aWB4YlCGRA9am7x_xFlRIJOj2oOhmI0xV6-W21KNrQjBm7YE56IiO2jD1hu3aiXIcm_GlbDXIC0fF78C51ywLp2CTGjzTXP66y7LP5FpaoDK5keWjuKHacEmYacMoz58FnnFEvR5613CEPpk6fvYnd70TnL2KoatyXpFJp_I1bk_QA2Rsa0gIOs3IftmhkJEwWu3bUMbgfa7gzU-2Sb8KDVJFbW4__Tm2dzfXw7wi7ngQFFGJ54whkXdfS3c5D7-WabDxPr5mTKFxMlUSthX-hw3fjpCunF_66WZolPVs7yPf7w9U6KLFSUeXH77RT6DqemZDVSPt-PnpdEnXgCVpdZHTXOq5m0yZ10z4qX9yJJZEQjtIRr1AYz0FfSeEH2EDjkLfKCV2GNefwlFMHXO5qiYEQLuAgbU4QQI30El_ZPa3LUGeeXTItwB07SiOKQUx0n5xf97arBCEL2hm-590VDQ4Rbh12-XlEghCwSQqSGQX1JdPmEtvo57Ps4l2OTIBWjvocNq90kpM4c7Wy_JtT9FyEbkcqyVfudvwUpzBvyagNK_lPwzZ7cQhTB5ydAqtoMei-YvPRz9adYRBMOCA0ktbDaEJd3gdtM-cwp5ECyCgTDhKI0qiH8MwLfnTVUdDFuyMLs1y0lOzBCSXn85urlhuU5HNk-EVWBbV5zgf2SUbD4tnKHowAy8PRTGaKKlv9dLDZKSOJ-BIhKVCa49jecrvQfOoYbjNlyRBaj0SfY-ffpQog2yewhwzmhxR9koIUUiJXTiqzX4NABnTyOtqCurzz-tHzCAwCyx-NoJXeUfQnypjpA1pqwFhPOXFscQESLZOt2TjA-xXlGwVxRFwVL2Vzcy6CWUHQXGIDjSej6rnS7uhp0aJJEpTPTfuBnAyUtXkc4CV2I_nOaLUNQBmjQjpVYRFZUvMXF5w2-PIEHBR1t0SyO2g6yPey9tK9jab0YqaZAiVYKMp9p_-StqDzkVaRF2-9trhzw9C5kU02q3uJ8VOJoXecVF_0000)

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

## Code Analysis

### Code coverage
- To install the code coverage, run the following command
```
npm i coverage
```
- To generate a code coverage report, run the following command:
```
npx hardhat coverage
```

## Supported Documents

### Deployment
- ERC20Token contract is deployed at [0xCD440D278dd100c159Dc49d631517A22cDb4F81C](https://sepolia.etherscan.io/address/0xcd440d278dd100c159dc49d631517a22cdb4f81c)
- TokenSale contract is deployed at [0xc8bbbbc1ff7C6cdbC42b42EC22c4ED2284844cB9](https://sepolia.etherscan.io/address/0xc8bbbbc1ff7c6cdbc42b42ec22c4ed2284844cb9)

### Verification
- [Verified ERC20Token contract link ](https://sepolia.etherscan.io/address/0xCD440D278dd100c159Dc49d631517A22cDb4F81C#code)
- [Verified TokenSale contract Link](https://sepolia.etherscan.io/address/0xc8bbbbc1ff7C6cdbC42b42EC22c4ED2284844cB9#code)

### Code Analysis

#### Code coverage report
![Coverage Report](https://gitlab.mindfire.co.in/abinash.p/assignment-2-token-sale/uploads/cf4a022922c054ddcad78ade4d612b39/image.png)