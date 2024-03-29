const { expect } = require("chai");
const { ethers } = require("hardhat");

let zeroAddress = "0x0000000000000000000000000000000000000000";
// Describe block for ERC20 token functionalities
describe("ERC20Token", function() {

    describe("constructor",function() {

        it("Should successfully initialize the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN")).not.to.be.reverted;
        });

    });

    describe("transferFrom Function",function () {

        //  case to verify if transferFrom functionalities work
        it("Should successfully transfer tokens to other address on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1,account2] = await ethers.getSigners();
            // Approve transfer from owner to account1
            await ERC20TokenInstance.approve(account1.address, 50000);
            // Perform transferFrom
            await ERC20TokenInstance.connect(account1).transferFrom(owner.address,account2.address, 1000);
            // Check balances after transferFrom
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccount2Balance = await ERC20TokenInstance.balanceOf(account2.address);
            // Assertions
            expect(ownerBalance).to.equal(99999999999999999000n);
            expect(otherAccount2Balance).to.equal(1000); 
        });

        it("Should fail to transfer tokens to other address on behalf of zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            // Attempt to transfer tokens from the zero address
            await expect(ERC20TokenInstance.transferFrom(zeroAddress, account1.address, 10)).to.be.revertedWith("ERC20: transfer from the zero address");
        });

        it("Should fail to transfer tokens to zero address on the behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            await expect(ERC20TokenInstance.transferFrom(account1.address,zeroAddress, 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

        //  case to verify failure when transferring more tokens than approved
        it("Should fail to transfer more tokens than approved", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1,account2] = await ethers.getSigners();
            // Approve transfer from owner to account1
            await ERC20TokenInstance.approve(account1.address, 50);
            // Expecting revert when transferring more than approved
            await expect(ERC20TokenInstance.connect(account1).transferFrom(owner.address, account2.address, 100000000000000000n)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });

        it("Should fail to transfer zero tokens on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1,account2] = await ethers.getSigners();
            // Approve transfer from owner to account1
            await ERC20TokenInstance.approve(account1.address, 50);
            await expect(ERC20TokenInstance.connect(account1).transferFrom(owner.address,account2.address, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

        it("Should fail to transfer tokens to owner on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            // Approve transfer from owner to account1
            await ERC20TokenInstance.approve(account1.address, 50);
            await expect(ERC20TokenInstance.connect(account1).transferFrom(owner.address,owner.address, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

    });

    describe("transfer Function",function() {
        
        it("Should successfully transfer tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            // Transfer tokens from owner to account1
            await ERC20TokenInstance.transfer(account1.address, 100);
            // Check balances after transfer
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(account1.address);
            // Assertions
            expect(ownerBalance).to.equal(99990000000000000000n); 
            expect(otherAccountBalance).to.equal(10000000000000000n); 
        });
    
        it("Should fail to transfer zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,account1] = await ethers.getSigners();
            // Expecting revert when transferring zero tokens
            await expect(ERC20TokenInstance.transfer(account1, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
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
            await expect(ERC20TokenInstance.transfer(zeroAddress, 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });
    
    });

    describe("approve Function",function () {
        it("Should successfully approve tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,account1] = await ethers.getSigners();
            await ERC20TokenInstance.approve(account1, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,account1);
            // Assertions
            expect(allowance).to.equal(5000000000000000n);
        });    
    
        it("Should fail to approve zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,account1] = await ethers.getSigners();
            await expect(ERC20TokenInstance.approve(account1, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
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
            await expect(ERC20TokenInstance.approve(zeroAddress, 10)).to.be.revertedWith("ERC20: approve to the zero address");
        });
    
        it("Should fail to approve excess tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,account1] = await ethers.getSigners();
            await expect(ERC20TokenInstance.approve(account1, 10000000)).to.be.revertedWith("ERC20: cannot approve excess tokens");
        });
    
    });

    describe("getter Functions",function () {

        it("Should successfully yield token name as Token", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const name = await ERC20TokenInstance.name();
            // Assertions
            expect(name).to.equal("Token");
        });
    
        it("Should successfully yield token symbol as TKN", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const symbol = await ERC20TokenInstance.symbol();
            // Assertions
            expect(symbol).to.equal("TKN"); 
        });
    
        it("Should successfully yield total Supply as 100000000000000000000", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const totalSupply = await ERC20TokenInstance.totalSupply();
            // Assertions
            expect(totalSupply).to.equal(100000000000000000000n);
        });
    
        //  case to verify if transfer of tokens is possible
        it("Should successfully yield balance of other address as 1000000000000000", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            // Transfer tokens from owner to account1
            await ERC20TokenInstance.transfer(account1.address, 10);
            // Check balance after transfer
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(account1.address);
            // Assertions
            expect(otherAccountBalance).to.equal(1000000000000000); 
        });
    
        it("Should successfully yield allowance of other address as 5000000000000000", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner,account1] = await ethers.getSigners();
            await ERC20TokenInstance.approve(account1, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,account1);
            // Assertions
            expect(allowance).to.equal(5000000000000000);
        }); 
    
        it("Should successfully yield decimals as 14", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const decimals = await ERC20TokenInstance.decimals();
            // Assertions
            expect(decimals).to.equal(14); 
        });
    
    });

});

describe("Owner(ERC20Token)",function () {

    describe("transferOwnership Function",function () {

        it("Should successfully transfer ownership", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1] = await ethers.getSigners();
            // Transfer ownership from owner to account1
            await expect(ERC20TokenInstance.transferOwnership(account1.address)).not.to.be.reverted; 
        });
    
        it("Should fail to transfer ownership by non owner of contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner, account1,account2] = await ethers.getSigners();
            // Transfer ownership from owner to account1
            await expect(ERC20TokenInstance.connect(account1).transferOwnership(account2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to transfer ownership to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to zero address
            await expect(ERC20TokenInstance.transferOwnership(zeroAddress)).to.be.revertedWith("Ownable: new owner is the zero address");
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
        it("Should successfully yield caller as owner of the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN");
            const [owner] = await ethers.getSigners();
            const Owner = await ERC20TokenInstance.owner();
            // Assertions
            expect(Owner).to.equal(owner.address); 
        });

    });

});