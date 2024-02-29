const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenSale", function () {

    let TokenSaleInstance, tokenOwner, tokenSaleOwner, beneficiary, investor1, investor2;

   describe("constructor", function () {
       it("Should successfully initialize TokenSale", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenOwner, tokenSaleOwner, beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.deploy(await ERC20TokenInstance.getAddress(), beneficiary.address)).not.to.be.reverted;
       }); 
   });

   describe("getter Functions",function () {
        beforeEach(async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            [tokenOwner,tokenSaleOwner, beneficiary,investor1,investor2] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
            await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
        });
        
        it("Should sucessfully yield the beneficiary", async() => {
            expect(await TokenSaleInstance.getBeneficiary()).to.equal(beneficiary.address);
        });

        it("Should sucessfully yield goal as 2 ETH", async() => {
            expect(await TokenSaleInstance.getGoal()).to.equal(2000000000000000000n);
        });

        it("Should sucessfully yield end block as 94", async() => {
            expect(await TokenSaleInstance.getEndBlock()).to.equal(94);
        });

        it("Should sucessfully yield total tokens sold as 0", async() => {
            expect(await TokenSaleInstance.getTotalTokenSold()).to.equal(0);
        });

        it("Should sucessfully yield sale is active or not", async() => {
            expect(await TokenSaleInstance.isSaleActiveOrNot()).to.equal(true);
        });
        
        it("Should sucessfully yield how much investor has invested", async() => {
            expect(await TokenSaleInstance.getFundsInvested(investor1.address)).to.equal(0);
        });

        it("Should sucessfully yield how much tokens investor has purchased", async() => {
            expect(await TokenSaleInstance.getTokensPurchased(investor1.address)).to.equal(0);
        });
        
        it("Should sucessfully yield how much times investor has invested", async() => {
            expect(await TokenSaleInstance.getTimesInvested(investor1.address)).to.equal(0);
        });

        it("Should sucessfully yield how much times investor has invested", async() => {
            expect(await TokenSaleInstance.isInvestor(investor1.address)).to.equal(false);
        });

        it("Should sucessfully yield how much funds raised", async() => {
            expect(await TokenSaleInstance.getRaisedFunds()).to.equal(0);
        });
        
        it("Should sucessfully yield how much funds remaining to reach the goal", async() => {
            expect(await TokenSaleInstance.getRemainingFundsToRaise()).to.equal(2000000000000000000n);
        }); 
        
        it("Should sucessfully yield the exchange value of amount", async() => {
            expect(await TokenSaleInstance.getExchangedValue(2000000000000000000n)).to.equal(20000);
        }); 

        it("Should fail to yield the exchange value of 0 amount", async() => {
            await expect(TokenSaleInstance.getExchangedValue(0)).to.be.revertedWith("TokenSale: Invalid amount");
        }); 

        it("Should successfully yield the max tokens available for sale", async() => {
            expect(await TokenSaleInstance.getMaxTokenAvailableForSale()).to.equal(800000);
        });

        it("Should successfully yield the max tokens a investor can purchase", async() => {
            expect(await TokenSaleInstance.getMaxTokenPerInvestor()).to.equal(5000);
        });

    });

});
