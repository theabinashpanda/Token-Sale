const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenSale", function () {

    let TokenSaleInstance, tokenOwner, tokenSaleOwner, beneficiary, investor1, investor2,investor3,investor4;

   describe("constructor", function () {
        it("Should successfully initialize TokenSale", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [tokenOwner, tokenSaleOwner, beneficiary] = await ethers.getSigners();
            const TokenSale = await ethers.getContractFactory("TokenSale");
            await expect(TokenSale.deploy(await ERC20TokenInstance.getAddress(), beneficiary.address)).not.to.be.reverted;
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
                
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).to.be.revertedWith("TokenSale: Sale is not active");
            });

            it("Should fail buy tokens when sale is inacitve", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await TokenSaleInstance.connect(tokenSaleOwner).stopSale();
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.5') })).to.be.revertedWith("TokenSale: Sale is not active");
            });

            it("Should fail to buy tokens with 0 ETH", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0') })).to.be.revertedWith("TokenSale: Invalid amount");
            });

            it("Should fail to buy tokens by investing ETH more than allowed", async() => {
                const ERC20Token = await ethers.getContractFactory("ERC20Token");
                const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
                [tokenOwner,tokenSaleOwner, beneficiary,investor1] = await ethers.getSigners();
                const TokenSale = await ethers.getContractFactory("TokenSale");
                TokenSaleInstance = await TokenSale.connect(tokenSaleOwner).deploy(await ERC20TokenInstance.getAddress(), beneficiary.address);
                await ERC20TokenInstance.connect(tokenOwner).approve(await TokenSaleInstance.getAddress(), 1000000);
                await expect (TokenSaleInstance.connect(investor1).buyTokens({ value: ethers.parseEther('0.6') })).to.be.revertedWith("TokenSale: Excess ETH invested");
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

        it("Should successfully yield end block as 174", async() => {
            expect(await TokenSaleInstance.getEndBlock()).to.equal(174);
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
