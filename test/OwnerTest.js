const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for owner functionalities
describe("Owner",function () {
    let zeroAddress = "0x0000000000000000000000000000000000000000";

    describe("constructor", function () {
        it("Should successfully initialize contract", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            await expect(Owner.deploy()).not.to.be.reverted; 
            
        });
    });

    describe("transferOwnership Function",function () {

        it("Should successfully transfer ownership", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            const OwnerInstance = await Owner.deploy();
            const [owner, account1] = await ethers.getSigners();
            // Transfer ownership from owner to account1
            await expect(OwnerInstance.transferOwnership(account1.address)).not.to.be.reverted; 
        });
    
        it("Should fail to transfer ownership by non owner of contract", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            const OwnerInstance = await Owner.deploy();
            const [owner, account1,account2] = await ethers.getSigners();
            // Transfer ownership from owner to account1
            await expect(OwnerInstance.connect(account1).transferOwnership(account2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to transfer ownership to zero address", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            const OwnerInstance = await Owner.deploy();
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to zero address
            await expect(OwnerInstance.transferOwnership(zeroAddress)).to.be.revertedWith("Ownable: new owner is the zero address");
        });
    
        it("Should fail to transfer ownership to current owner", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            const OwnerInstance = await Owner.deploy();
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to the current owner
            await expect(OwnerInstance.transferOwnership(owner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
        });

    });

    describe("getter Functions",function () {
        it("Should successfully yield the owner of the contract", async () => {
            const Owner = await ethers.getContractFactory("Owner");
            const OwnerInstance = await Owner.deploy();
            const [owner] = await ethers.getSigners();
            const ownerAddress = await OwnerInstance.owner();
            // Assertions
            expect(ownerAddress).to.equal(owner.address); 
        });

    });

});