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
![UML_Design](https://www.plantuml.com/plantuml/dpng/hLPXQ-is5FsUNt5XNsJQmdYmCSesNbgI4TQNb2HqOwCOnRv9j2TBHfAJXctljw-M5KjMt3GR-zRUUyxLrTMvn_ce3LMcAlX0hlx0pC03Rb3aVmu006xWKR4TDGWxgXXTSTGsVWMFrOgpB0f_1QCNWqfG3kjAP8P9eKdIPSG9VqIS-G9F3FUTyD-30HC6rPfc29FPNg1g6frAqEQqJzoXC61nUilAfQ92hr4fp4cfSCTafMto5cYUAzGQcCZn1VDhWVl-JE9kQbojjZWveIIti9AIEuAiSoI17SDz2wblb76gDGINkMdFJ2t91W4AcRCrGmLIy8E5jxFDfD16LPcHFdP9WxvKqEgNOwijBfhxQ7x_uUkb_8pYWk4VPqxMIXQdSmOZUu8xoYkyXOe9y-6RRvEWtB0ibNnD4zd_Rg1B53cgzuj6xqWKPgnaA4nBlGPQo4eOp-ayABMj8F4ddgT51uwLB8YEgV-w2oCDvOkgBFcX5PS3EiIASYeodAq9pJ9P1QNxyPHpkQyPqOpzRC_pSynOGRac2PILSXF_pYlTomUEUjT6CR61LD02ev0-52l9NT0T16bmQvSgQ5dMXD-Fx_x3ZqVuCwHk1heB3h5nAA0_G-aiAcrde-Eb5DByXaeExLkH-CbwzhI-QthhxdaDpJtRW6FyRse1L--_oltgRRd7h7T6qN6QUWWaELxQ1PjHnE6kqjjwBdb6v37KwxjZITVnnIBYrHbX1-PeXRsW74UrN-aB7D8oz6EbiYtLc9DLTUZrhtYGGOdwl8MHPVbAjsCQLoBNSyeqvhq4c_-5cMskw5wGCwNlKE2QPOogm_sMYWtcHF8yYFPqAd1_3f1uBsYdTVBbyounR48HeAI7Uf2myWT59h6Hb4CKGv7VSPbzZi9sBwamy6duQxgS_JoQfiEduUHXUFSmIiUpUReOFepUvpoEvkba-ZHQB6Vpjz3tiyKodOtJsNJKi2AWVRvcB9BdBcatcEbwKCFCi1qwzsdC12PYXxhsb7NzhCr_mSDVW-bABCom0liOM-gZzlZaJUjiZty6vluwSKTDEKwbQPedIPpUKSxonYzcQYelyi_K1E88J2nTnT8Bv78izBfZpTgHv9ZgzdZQ4fhjiByhRMHPFmtnlwUY6n_RjmiKh0P9urKv-ylCsxVTtwKCIxtrOsw3fWDhp_3vdoJbiQNQnCYjIszosL7gAIJKQpF296vi7EgLf6Ujsr4YjxoGv5L-4OKvi5HzuEWIZStQg_JEQOu5POA9ZNiqYm-G4CpxfP58_aHvXITRyFwUH9-ikkOd-jBOw8uoNWjzB9LJg_-AzJ8UKRLZU1DyBxMPhMS2BIN6rKu_QHRY-xzkRi3-EGW2tkQ3gFyi32OUS4A8lxKnzoEAl2huFm00)

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
