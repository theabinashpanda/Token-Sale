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