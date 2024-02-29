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

}

