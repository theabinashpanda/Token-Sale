// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IERC20Token.sol";
import "./Owner.sol";
import "./ITokenSaleEvents.sol";

/**
 * @title TokenSale Implementation
 * @dev Contract for conducting a token sale
 */
contract TokenSale is Owner,ITokenSaleEvents{
    address immutable private _erc20TokenAddress;
    address payable private beneficiary;
    uint256 immutable private goal;
    uint256 immutable private endBlock;
    uint256 private constant MAX_TOKEN_AVAILABLE_FOR_SALE = 800_000;
    uint256 private constant MAX_TOKEN_PER_INVESTOR = 5000;
    uint256 private constant COST_OF_ONE_TOKEN =10000;
    uint256 private totalTokenSold;
    bool private isSaleActive;
    struct Investor {
        uint256 fundsInvested;
        uint256 tokensPurchased;
        uint256 timesInvested;
        bool hasInvested;
    }
    mapping (address => Investor) investors;

    /**
     * @dev Modifier to enforce that the token sale is not active. 
     */
    modifier saleNotActive() {
        require(isSaleActive,"TokenSale: Sale is not active");
        _;
    }

    /**
     * @dev Modifier to validate the amount sent.
     * @param amount The amount to validate
     */
    modifier validAmountOrNot(uint256 amount){
        require(amount > 0, "TokenSale: Invalid amount");
        _;
    }

    /**
     * @dev Constructor to initialize the TokenSale contract
     * @param _tokenAddress The address of ERC20 token being sold
     * @param _beneficiary The address to receive funds from the token sale
     */
    constructor(
        address _tokenAddress
        , address payable _beneficiary
        ) Owner(){
            require(_tokenAddress != address(0), "TokenSale: Token address cannot be zero");
            require(_beneficiary != address(0), "TokenSale: Beneficiary address cannot be zero");
            _erc20TokenAddress = _tokenAddress;
            beneficiary = _beneficiary;
            goal = 2 ether;
            endBlock = block.number + 32;
            isSaleActive = true;
        }

    /**
     * @dev Function to allow investors to buy tokens during the sale
     */
    function buyTokens() public payable saleNotActive validAmountOrNot(msg.value) returns(bool){
        require(block.number <= endBlock,"TokenSale: Sale has been ended");
        require(msg.sender != owner(),"TokenSale: Owner cannot invest");
        uint256 tokensToBuy = getExactTokens(msg.value);
        require((getTokensPurchased(msg.sender) + tokensToBuy)/10 ** IERC20Token(_erc20TokenAddress).decimals() <= MAX_TOKEN_PER_INVESTOR, "TokenSale: Reached max purchase limit");
        totalTokenSold += getExchangedValue(msg.value);
        investors[msg.sender].fundsInvested += msg.value;
        investors[msg.sender].tokensPurchased+= tokensToBuy;
        investors[msg.sender].timesInvested++;
        if (!investors[msg.sender].hasInvested)
            investors[msg.sender].hasInvested = true;
        if (address(this).balance >= goal)
            stopTheSale();
        emit TokensPurchased(msg.sender, tokensToBuy);
        bool transaction = IERC20Token(_erc20TokenAddress).transferFrom(IOwner(_erc20TokenAddress).owner(),msg.sender, tokensToBuy);
        return transaction;
    }

    /**
     * @dev Function to stop the token sale, can only be called by the contract owner
     */
    function stopSale() public onlyOwner saleNotActive {
        stopTheSale();
    }

    /**
     * @dev Changes the beneficiary address.
     * @param newBeneficiary The new beneficiary address.
     * @return A boolean indicating whether the beneficiary address was successfully changed.
     */
    function changeBeneficiary(address newBeneficiary) public onlyOwner returns(bool){
        address oldBeneficiary = beneficiary;
        require(beneficiary != newBeneficiary,"TokenSale: Cannot change to same address");
        beneficiary = payable(newBeneficiary);
        emit BeneficiaryChanged(oldBeneficiary,beneficiary);
        return true;
    }

    /**
     * @dev Transfers funds to the beneficiary address.
     * Can only be called by the owner and if the token sale is not active.
     */
    function transferFundsToBeneficiary() public onlyOwner returns(bool){
        require(!isSaleActive, "TokenSale: Token sale is still active");
        uint256 amount = address(this).balance;
        require(amount > 0, "TokenSale: No funds available to withdraw");
        emit FundsWithdrawn(amount);
        beneficiary.transfer(amount);
        return true;
    }

    /**
     * @dev Function to get the address of the beneficiary
     * @return The address of the beneficiary
     */
    function getBeneficiary() public view returns (address){
        return beneficiary;
    }

    /**
     * @dev Function to get the goal amount of funds to be raised during the token sale
     * @return The goal amount of funds to be raised
     */
    function getGoal() public view returns (uint256){
        return goal;
    }

    /**
     * @dev Function to get the end block number of the token sale
     * @return The end block number of the token sale
     */
    function getEndBlock() public view returns (uint256){
        return endBlock;
    }

    /**
     * @dev Function to get the total number of tokens sold during the token sale
     * @return The total number of tokens sold
     */
    function getTotalTokenSold() public view returns (uint256){
        return totalTokenSold;
    }

    /**
     * @dev Function to check if the token sale is currently active
     * @return A boolean indicating whether the token sale is active
     */
    function isSaleActiveOrNot() public view returns (bool){
        return isSaleActive;
    }

    /**
     * @dev Function to get the amount of funds invested by a specific account
     * @param accountAddress The address of the account to check
     * @return The amount of funds invested by the account
     */
    function getFundsInvested(address accountAddress) public view returns(uint256) {
        return investors[accountAddress].fundsInvested;
    }

    /**
     * @dev Function to get the total number of tokens purchased by a specific account
     * @param accountAddress The address of the account to check
     * @return The total number of tokens purchased by the account
     */
    function getTokensPurchased(address accountAddress) public view returns (uint256){
        return investors[accountAddress].tokensPurchased / 10 ** IERC20Token(_erc20TokenAddress).decimals();
    }

    /**
     * @dev Function to get the number of times an account has invested
     * @param accountAddress The address of the account to check
     * @return The number of times the account has invested
     */
    function getTimesInvested(address accountAddress) public view returns (uint256){
        return investors[accountAddress].timesInvested;
    }

    /**
     * @dev Function to check if an account has invested in the token sale
     * @param accountAddress The address of the account to check
     * @return A boolean indicating whether the account has invested
     */
    function isInvestor(address accountAddress) public view returns(bool) {
        return investors[accountAddress].hasInvested;
    }

    /**
     * @dev Function to get the total amount of raised funds
     * @return The total amount of raised funds
     */
    function getRaisedFunds() public view returns(uint256){
        return address(this).balance;
    }

    /**
     * @dev Function to get the remaining funds needed to reach the goal
     * @return The remaining funds needed to reach the goal
     */
    function getRemainingFundsToRaise() public view returns (uint256) {
        return goal - getRaisedFunds();
    }
    
    /**
     * @dev Function to get the exchanged value of an amount in tokens
     * @param amount The amount to be exchanged
     * @return The exchanged value in tokens
     */
    function getExchangedValue(uint256 amount)public view validAmountOrNot(amount) returns (uint256) {
        return getExactTokens(amount)/ 10 ** IERC20Token(_erc20TokenAddress).decimals();
    }

    /**
     * @dev Function to get the maximum number of tokens available for sale
     * @return The maximum number of tokens available for sale
     */
    function getMaxTokenAvailableForSale() public pure returns (uint256){
        return MAX_TOKEN_AVAILABLE_FOR_SALE;
    }

    /**
     * @dev Function to get the maximum number of tokens that can be purchased per investor
     * @return The maximum number of tokens per investor
     */
    function getMaxTokenPerInvestor() public pure returns(uint256){
        return MAX_TOKEN_PER_INVESTOR;
    }

    /**
     * @dev Function to get the cost of one token
     * @return The cost of one token.
     */
    function getCostOfOneToken() public pure returns(uint256){
        return COST_OF_ONE_TOKEN;
    }

    /**
     * @dev Internal function to stop the token sale
     */
    function stopTheSale() internal {
        isSaleActive = false;
        emit SaleStopped(address(this).balance);
    }

    /**
     * @dev Function to get the exact number of tokens equivalent to the given amount of ether.
     * @param amount The amount of ether to be converted to tokens.
     * @return The exact number of tokens equivalent to the given amount of ether.
     */
    function getExactTokens(uint256 amount) internal view returns(uint256){
        return (amount * COST_OF_ONE_TOKEN * 10 ** IERC20Token(_erc20TokenAddress).decimals())/ 1 ether;
    }
    
}

