const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for ERC20 token functionalities
describe("ERC20Token", function() {

    describe("constructor",function() {

        it("Sucessfully initialize the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN")).not.to.be.reverted;
        });

    });

    describe("transferFrom Function",function () {

        //  case to verify if transferFrom functionalities work
        it("Sucessfully transfer tokens to other address on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50000);
            // Perform transferFrom
            await ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,otherAccount2.address, 1000);
            // Check balances after transferFrom
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccount2Balance = await ERC20TokenInstance.balanceOf(otherAccount2.address);
            // Assertions
            expect(ownerBalance).to.equal(999000);
            expect(otherAccount2Balance).to.equal(1000); 
        });

        it("Should fail to transfer tokens to other address on behalf of zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount] = await ethers.getSigners();
            // Attempt to transfer tokens from the zero address
            await expect(ERC20TokenInstance.transferFrom("0x0000000000000000000000000000000000000000", otherAccount.address, 10)).to.be.revertedWith("ERC20: transfer from the zero address");
        });

        it("Should fail to transfer tokens to zero address on the behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.transferFrom(otherAccount.address,"0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

        //  case to verify failure when transferring more tokens than approved
        it("Should fail to transfer more tokens than approved", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            // Expecting revert when transferring more than approved
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount2.address, 100)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });

        it("Should fail to transfer zero tokens on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,otherAccount2.address, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

        it("Should fail to transfer tokens to owner on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,owner.address, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

    });

    describe("transfer Function",function() {
        
        it("Sucessfully transfer tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer tokens from owner to otherAccount
            await ERC20TokenInstance.transfer(otherAccount.address, 100);
            // Check balances after transfer
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
            // Assertions
            expect(ownerBalance).to.equal(999900); 
            expect(otherAccountBalance).to.equal(100); 
        });
    
        it("Should fail to transfer zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,otherAccount] = await ethers.getSigners();
            // Expecting revert when transferring zero tokens
            await expect(ERC20TokenInstance.transfer(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });
    
        it("Should fail to transfer tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to self
            await expect(ERC20TokenInstance.transfer(owner, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });
    
        it("Should fail to transfer tokens to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to the zero address
            await expect(ERC20TokenInstance.transfer("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });
    
    });

    describe("approve Function",function () {
        it("Successfully approve tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.approve(otherAccount, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,otherAccount);
            // Assertions
            expect(allowance).to.equal(50);
        });    
    
        it("Should fail to approve zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.approve(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });
    
        it("Should fail to approve tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Expecting revert when approving to self.
            await expect(ERC20TokenInstance.approve(owner, 50)).to.be.revertedWith("ERC20: cannot approve self");
        });
    
        it("Should fail to approve tokens to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Attempt to approve to the zero address
            await expect(ERC20TokenInstance.approve("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: approve to the zero address");
        });
    
        it("Should fail to approve excess tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.approve(otherAccount, 10000000)).to.be.revertedWith("ERC20: cannot approve excess tokens");
        });
    
    });

    describe("getter Functions",function () {

        it("Token name should be Token", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const name = await ERC20TokenInstance.name();
            // Assertions
            expect(name).to.equal("Token");
        });
    
        it("Token symbol should be TKN", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const symbol = await ERC20TokenInstance.symbol();
            // Assertions
            expect(symbol).to.equal("TKN"); 
        });
    
        it("Total Supply should be 1000000", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const totalSupply = await ERC20TokenInstance.totalSupply();
            // Assertions
            expect(totalSupply).to.equal(1000000);
        });
    
        //  case to verify if transfer of tokens is possible
        it("Balance of other address should be 10", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");100
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer tokens from owner to otherAccount
            await ERC20TokenInstance.transfer(otherAccount.address, 10);
            // Check balance after transfer
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
            // Assertions
            expect(otherAccountBalance).to.equal(10); 
        });
    
        it("Allowance of other address should be 50", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.approve(otherAccount, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,otherAccount);
            // Assertions
            expect(allowance).to.equal(50);
        }); 
    
        it("Decimals should be 14", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const decimals = await ERC20TokenInstance.decimals();
            // Assertions
            expect(decimals).to.equal(14); 
        });
    
    });

});

// Describe block for owner functionalities
describe("Ownable",function () {

    describe("transferOwnership Function",function () {

        it("Successfully transfer ownership", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.transferOwnership(otherAccount.address)).not.to.be.reverted; 
        });
    
        it("Should fail to transfer ownership by non owner of contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.connect(otherAccount).transferOwnership(otherAccount2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to transfer ownership to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to zero address
            await expect(ERC20TokenInstance.transferOwnership("0x0000000000000000000000000000000000000000")).to.be.revertedWith("Ownable: new owner is the zero address");
        });
    
        it("Should fail to transfer ownership to current owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to the current owner
            await expect(ERC20TokenInstance.transferOwnership(owner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
        });

    });

    describe("getter Functions",function () {
        it("Caller must be the owner of the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            const Owner = await ERC20TokenInstance.owner();
            // Assertions
            expect(Owner).to.equal(owner.address); 
        });

    });

});