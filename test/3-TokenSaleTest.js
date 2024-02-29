const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenSale", function () {

    let TokenSaleInstance;

   describe("constructor", function () {
       it("Should successfully initialize TokenSale", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenOwner, tokenSaleOwner, beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.deploy(await ERC20TokenInstance.getAddress(), beneficiary.address)).not.to.be.reverted;
       }); 
   });

});
