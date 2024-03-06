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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLPVQ-is57_Ffn3inQOjZ0iRespZkXTt2-jDGXAwiL6COfyasfKb8ybEmxP-zicohSYAtQPm-vIUy_kT_-V87wN2GfKvdV3Dtv0gz00xODa_4wJ_Rj12a0ehG1KM16yeI2E_GejoGqdgYRz1yRC2mJ15svAbYd0cWx37y1ME2r_pWXu977hY_oOJmhI7BKu1JUS71g89TCQHLETnGWLC8OEJUrAi1MPo2q905XG2Ai9BQPIt26UP02aHOHayGtRDu32i2TjCLMlB6W_EAE4jsd1EMmAlTK68AfsKXTGPfHHhyquoDzPdOaX6Y53ECx8b811dz6ZWjhOfPrA9CbNSoYuAy6JA2VMb2zNYlBh7oqyVlbtpBy0kA7vNys0hU7vUPwJuWB32j8HRL6gd7xxxFdJCHKKXk5O7VBXlI1QWVugtZNfz30Iaf23QXwLU8vppaYdBwJSKcr0Wy3sEqJo7zxeUWVIfxuv2SONfgYmAUhJ3rG9Rn0PJp5AORmESfhnqJ0_ZCQNyK3Ey6lkr7UDda98SKwd3AKhHLlo7qwIVnWTryowL86o74ePpy4Joc6yuROMj8qJol5JrfA74oRy5vRenDVMlRW9--haZFdN5a7si2_L53li95UsjiZMI_d8ohlu4mIFJiy1ltS2-rZadjss-rwZ9rmfQnbUR6kJPU-_ONusFlSzwenIzYrCN8GYxf1jXMmfVt9_u_l2zl3RiFjJsi7-Qhlt4FEBLo81xHz8C-0fJYEkx9I-ub8OX5wL8zrX25cpAu-0TymlfcAZzhHGl2aqtPRelMIQNc6XxWmIZ_vseVIRmWGMlcBu31bkI4YoEd_QOxRG7JZD7EX0fWyDhWF1q4sorl1VGtNGGQNiteaRfGGjyDC3DoUNesTXnJD6e5bXsHtdwnGEOhSLCeS_H7ybw_biyIwB7QFeGtJt4oVrycQoYX_XjpY9U9jFPOxnQpvTZQ8DSQLWodyL9lFxL0vhcDaNZD6kLPh-9hCiOfOfKqDwcvjIWAQj0rXTdMpUz-SyPYskat07iQqWEGmoDirBZFXozgzRz4oBjhxFRAJ656LTDy47egojCITPSaxdGk4kkQwASWN5ENBBn1zCPeSwGti1cAOEmK_LZF0y9r3vwxNfAnOkwGO7zzlBpxf8mI-QiJ-1lqzX7d7VXpOglkMjfxBjl1we7ipvE-byuflxLDOgutPb1vRethkSGTsYREeP-OFVkq7R7tU_hi6ztgjz7TSV-OYAHtQYFKlpacWjjKXoitn9oJ9XUgBQP1kyWaTE7vsPoiaTCIpXRaRUNo7_jjCtF-BcvknKcjDw2UoxgXhaFu31Z0S8MOnXiEpHbSmRwqlcu-f6ODdlouxytDyZyd3Y2q_UaAxKlocHw0fmH_6VQvtu4bfKv_Hy0)

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