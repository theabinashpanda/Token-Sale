// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IERC20Token.sol";
import "./Ownable.sol";
import "./ITokenSaleEvents.sol";

/**
 * @title TokenSale Implementation
 * @dev Contract for conducting a token sale
 */
contract TokenSale is Owner,ITokenSaleEvents{
    address private _ERC20TokenAddress;
    address payable private beneficiary;
    uint256 private goal;
    uint256 private endBlock;
    uint256 private constant MAX_TOKEN_AVAILABLE_FOR_SALE = 800000;
    uint256 private constant MAX_TOKEN_PER_INVESTOR = 5000;
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
     * @dev Modifier to validate the amount sent is sufficient
     * @param amount The amount to validate
     */
    modifier validAmountOrNot(uint256 amount){
        require(amount >= 10 ** IERC20Token(_ERC20TokenAddress).decimals(), "TokenSale: Invalid amount");
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
            _ERC20TokenAddress = _tokenAddress;
            beneficiary = _beneficiary;
            goal = 2 ether;
            endBlock = block.number + 32;
            isSaleActive = true;
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
     * @param _account The address of the account to check
     * @return The amount of funds invested by the account
     */
    function getFundsInvested(address _account) public view returns(uint256) {
        return investors[_account].fundsInvested;
    }

    /**
     * @dev Function to get the total number of tokens purchased by a specific account
     * @param _account The address of the account to check
     * @return The total number of tokens purchased by the account
     */
    function getTokensPurchased(address _account) public view returns (uint256){
        return investors[_account].tokensPurchased;
    }

    /**
     * @dev Function to get the number of times an account has invested
     * @param _account The address of the account to check
     * @return The number of times the account has invested
     */
    function getTimesInvested(address _account) public view returns (uint256){
        return investors[_account].timesInvested;
    }

    /**
     * @dev Function to check if an account has invested in the token sale
     * @param _account The address of the account to check
     * @return A boolean indicating whether the account has invested
     */
    function isInvestor(address _account) public view returns(bool) {
        return investors[_account].hasInvested;
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
        return amount / 10 ** IERC20Token(_ERC20TokenAddress).decimals();
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

}

