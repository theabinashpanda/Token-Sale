const { expect } = require("chai");
const { ethers } = require("hardhat");

let zeroAddress = "0x0000000000000000000000000000000000000000";

describe("TokenSale", function () {

    let TokenSaleInstance, tokenOwner, tokenSaleOwner, beneficiary, investor1, investor2,investor3,investor4,newBeneficiary;

   describe("constructor", function () {
        it("Should successfully initialize TokenSale", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenOwner, tokenSaleOwner, beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.deploy(await ERC20TokenInstance.getAddress(), beneficiary.address)).not.to.be.reverted;
        }); 

        it("Should fail to initialize TokenSale as token address is zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenSaleOwner,beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.connect(tokenSaleOwner).deploy(zeroAddress, beneficiary.address)).to.be.revertedWith("TokenSale: Token address cannot be zero");
        }); 

        it("Should fail initialize TokenSale as beneficiary is zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenOwner, tokenSaleOwner, beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.deploy(await ERC20TokenInstance.getAddress(), zeroAddress)).to.be.revertedWith("TokenSale: Beneficiary address cannot be zero");
        }); 
   });

   describe("Functions",function () {
        describe("buyTokens Function",function () {

            it("Should successfully buy tokens", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            });

            it("Should fail to buy tokens with 0 value", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseUnits("0", "wei")})).to.be.revertedWith("TokenSale: Invalid amount");
            });

            it("Should successfully stop the sale after reaching the ETH goal", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1,investor2,investor3,investor4] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
                await expect (TokenSaleInstance.connect(investor2).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
                await expect (TokenSaleInstance.connect(investor3).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
                await expect (TokenSaleInstance.connect(investor4).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
                expect(await TokenSaleInstance.isSaleActiveOrNot()).to.equal(false);

            });

            it("Should fail to buy tokens after 32 blocks mined", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                for (let i = 0; i < 32; i++) {
                    await ethers.provider.send("evm_mine", []);
                }
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.2') })).to.be.revertedWith("TokenSale: Sale has been ended");
            });

            it("Should fail to buy tokens when sale is inactive", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).to.be.revertedWith("TokenSale: Sale is not active");
            });

            it("Should fail to buy tokens by investing ETH more than allowed", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.6') })).to.be.revertedWith("TokenSale: Reached max purchase limit");
            });

            it("Should fail to buy tokens without approving tokens to TokenSale", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
            });

            it("Should fail to buy tokens by the sale owner", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(tokenSaleOwner).buyTokens({ value: ethers.parseEther('0.5') })).to.be.revertedWith("TokenSale: Owner cannot invest");
            });

        }); 
        
        describe("stopSale Function", function () {
            beforeEach(async () => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
            });

            it("Should successfully stop the sale", async() => {
                await expect(TokenSaleInstance.connect(tokenSaleOwner).stopSale()).not.to.be.reverted;
            });

            it("Should fail to stop the sale by non owner", async() => {
                await expect(TokenSaleInstance.connect(investor1).stopSale()).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should fail to stop the sale when sale is not active", async() => {
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect(TokenSaleInstance.connect(tokenSaleOwner).stopSale()).to.be.revertedWith("TokenSale: Sale is not active");
            });
        });

        describe("changeBeneficiary Function", function () {
            beforeEach(async () => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner,investor1, beneficiary,newBeneficiary] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
            });

            it("Should successfully change beneficiary", async() => {
                await expect(TokenSaleInstance.connect(tokenSaleOwner).changeBeneficiary(newBeneficiary)).not.to.be.reverted;
            });

            it("Should fail to change beneficiary by non owner", async() => {
                await expect(TokenSaleInstance.connect(investor1).changeBeneficiary(newBeneficiary)).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should fail to change to same beneficiary", async() => {
                await expect(TokenSaleInstance.connect(tokenSaleOwner).changeBeneficiary(beneficiary)).to.be.revertedWith("TokenSale: Cannot change to same address");
            });

        });

        describe("transferFundsToBeneficiary", function () {
            beforeEach(async () => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner,investor1, beneficiary] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
            });

            it("Should successfully transfer funds to beneficiary", async() => {
                await TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') });
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect(TokenSaleInstance.connect(tokenSaleOwner).transferFundsToBeneficiary()).not.to.be.reverted;
            });

            it("Should fail to transfer funds to beneficiary by non owner", async() => {
                await TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') });
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect(TokenSaleInstance.connect(investor1).transferFundsToBeneficiary()).to.be.revertedWith("Ownable: caller is not the owner");
            });

            it("Should fail to transfer funds to beneficiary when sale is active", async() => {
                await TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') });
                await expect(TokenSaleInstance.connect(tokenSaleOwner).transferFundsToBeneficiary()).to.be.revertedWith("TokenSale: Token sale is still active");
            });

            it("Should fail to transfer zero funds to beneficiary", async() => {
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect(TokenSaleInstance.connect(tokenSaleOwner).transferFundsToBeneficiary()).to.be.revertedWith("TokenSale: No funds available to withdraw");
            });

        });

    });

   describe("getter Functions",function () {
        beforeEach(async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
            await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
        });
        
        it("Should successfully yield the beneficiary", async() => {
            expect(await TokenSaleInstance.getBeneficiary()).to.equal(beneficiary.address);
        });

        it("Should successfully yield goal as 2 ETH", async() => {
            expect(await TokenSaleInstance.getGoal()).to.equal(2000000000000000000n);
        });

        it("Should successfully yield end block as 222", async() => {
            expect(await TokenSaleInstance.getEndBlock()).to.equal(222);
        });

        it("Should successfully yield total tokens sold as 5000", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getTotalTokenSold()).to.equal(5000);
        });

        it("Should successfully yield sale is active", async() => {
            expect(await TokenSaleInstance.isSaleActiveOrNot()).to.equal(true);
        });

        it("Should successfully yield sale is not active", async() => {
            await TokenSaleInstance.stopSale();
            expect(await TokenSaleInstance.isSaleActiveOrNot()).to.equal(false);
        });
        
        it("Should successfully yield how much investor has invested", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getFundsInvested(investor1.address)).to.equal(500000000000000000n);
        });

        it("Should successfully yield how much tokens investor has purchased", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getTokensPurchased(investor1.address)).to.equal(5000);
        });
        
        it("Should successfully yield how much times investor has invested", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.3') })).not.to.be.reverted;
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.2') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getTimesInvested(investor1.address)).to.equal(2);
        });

        it("Should successfully yield how much times investor has invested", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.isInvestor(investor1.address)).to.equal(true);
        });

        it("Should successfully yield how much funds raised as 0.5 ETH", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getRaisedFunds()).to.equal(500000000000000000n);
        });
        
        it("Should successfully yield how much funds remaining to reach the goal as 1.5 ETH", async() => {
            await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).not.to.be.reverted;
            expect(await TokenSaleInstance.getRemainingFundsToRaise()).to.equal(1500000000000000000n);
        }); 
        
        it("Should successfully yield the exchange value of amount", async() => {
            expect(await TokenSaleInstance.getExchangedValue(2000000000000000000n)).to.equal(20000);
        }); 

        it("Should fail to yield the exchange of 0 value", async() => {
            await expect(TokenSaleInstance.getExchangedValue(ethers.parseEther('0'))).to.be.revertedWith("TokenSale: Invalid amount");
        }); 

        it("Should successfully yield the max tokens available for sale", async() => {
            expect(await TokenSaleInstance.getMaxTokenAvailableForSale()).to.equal(800000);
        });

        it("Should successfully yield the max tokens a investor can purchase", async() => {
            expect(await TokenSaleInstance.getMaxTokenPerInvestor()).to.equal(5000);
        });

        it("Should successfully yield the cost of one token", async() => {
            expect(await TokenSaleInstance.getCostOfOneToken()).to.equal(10000);
        });

    });

});

describe("Owner(TokenSale)",function () {

    describe("transferOwnership Function",function () {
        beforeEach(async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            [tokenOwner,tokenSaleOwner, beneficiary,investor1,investor2] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
            await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
        });

        it("Should successfully transfer ownership", async () => {
            await expect(TokenSaleInstance.transferOwnership(investor2.address)).not.to.be.reverted; 
        });
    
        it("Should fail to transfer ownership by non owner of contract", async () => {
            await expect(TokenSaleInstance.connect(investor1).transferOwnership(investor2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to transfer ownership to zero address", async () => {
            await expect(TokenSaleInstance.transferOwnership(zeroAddress)).to.be.revertedWith("Ownable: new owner is the zero address");
        });
    
        it("Should fail to transfer ownership to current owner", async () => {
            await expect(TokenSaleInstance.transferOwnership(tokenSaleOwner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
        });

    });

    describe("getter Functions",function () {
        it("Should successfully yield caller as owner of the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
            await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
            const Owner = await TokenSaleInstance.owner();
            expect(Owner).to.equal(tokenSaleOwner.address); 
        });

    });

});