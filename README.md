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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLRXQ-is4F-UlqAmBp9jOJpO66KRBotE5jQNb2HqOwCOnReasfCb8yb9mxRtjs-MPKLMx3Q5VKlkxdVItVtk9t_KXYXJ5Nmartz2Rj03R47GlqO88NI37XNR4mDeJnGZQmxQsg_GOxNcB8_CNw7qnO0IXADD9NB3fD0uwI82HtH4xFc2dXWSEkP_HYCc3AWDoG5DvmS1ghdeJ29jpky9Un06sJYzO-LA4Q4te1HGN2hOCrbfwxn5X585MYCcABm0lHPmwFSahbBZSlda-0oItAArbDm1PEt32TepEFYGkgAS4wrHKCoDFpEp86j4g92KRHWe90K_sd3VsrmARLIL6-bj5rtmb2guwfVsgZukwdkwkF_mzKf-1d51yzkUuusInNcVaP4znZtX5ToYYWdpuPjlao3Tk2oL_C-DPV_Sa2v1K51l9utcY1Nah6GWZ8TU8rB8IXYFwGwKsAi0ZaySWaK7JfGii8wXxxw5aORmPLMM_EZ9vG9Tn9fm8dAORp39Sra5gVlZ2UVoK2EY7iUz7S9Jo5b1kCO9AYlbElxTYUad-g2Mxzee9hOe4wI0oAIFnLfoPtG78LOKbQcPXhAWVXTKaBAieN-q3FZXnnRut3P3TsF3qDWKe9zHwRJAzqZ7ooca-HsK7DkPuMXqVVjQrvpTkdglKLElDpZ4_yOQ5ELxB-slXcaVezveHKTnwYRWf2tQ6PjMnEOkutq-vnmcUnmQyBmZJTTnOH7mQe3WaKXQWYy9XxJMBNs1Kbg4VgnKlYCQA5vNnruTYniPfAZFMnfPba2nRTEa4bGl2DD0Um7M_oipEwh8GU1NKj-1W0tB6L77-nqHMw1OSXfOUsuguF1QG7BI1D-jw0KCDnrKxdHZt3YZq98SRU3wTEIWR6mbuMZG2uBUSPb_ZWBirX9XqAVnRzbg_aiwoyPFu-d3-EuXpIRpHROSFwHlOnxJHJQTFQNBrNmn57q_Nwwo-IIRpz865GNQuJPDavmwfzrlfkisZdF3zk2qgP4QD1LxqBNYREgXD_y2MbmZqoLWw645z25s9B3MnoU3kkgFVqRC_JhJJaqupAHfBe-JsBqddD56JUPg9YzIrym4X0aaBbl7n0mer2PQLyTcAN7IkhftFByIcDtuDVNKHfRrWB3_zehhRekmInQi3uwtQUWZBb9uk-8h6MOQ-kxRWkc4-JDE_fyauR7gMaVgTgRNkUhGzJma96tJnoI-s2GaRIlkyLpxpmvO_KveGFlBWKpxJHk4HCKr2crBxEtV0Wh211DRDqmR7qIYO0ul3NFe4-4LdAt8cqiKltPrpa_afT7TFM6yteA9L8x4_W7iHpo2yite3_OJcegvW7JrSnnNFnBJPa--__lc1jcVey1m-fuChVv56KrF0MU0-9cEiHz1qAhW_m80)

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