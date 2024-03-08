require('dotenv').config();
(async () => {
    try {
        const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token","TKN");
        await ERC20TokenInstance.waitForDeployment();
        console.log(`Deploy ERC20Token contract at ${await ERC20TokenInstance.getAddress()}`);

        const TokenSale = await hre.ethers.getContractFactory("TokenSale");
        const beneficiaryAddress = process.env.BENEFICIARY_ADDRESS;
        const TokenSaleInstance = await TokenSale.deploy(await ERC20TokenInstance.getAddress(), beneficiaryAddress);
        await TokenSaleInstance.waitForDeployment();
        console.log(`Deploy TokenSale contract at ${await TokenSaleInstance.getAddress()}`);
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
})();
