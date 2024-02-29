// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title ITokenSaleEvents
 * @dev Interface for token sale events
 */
interface ITokenSaleEvents {
    /**
     * @dev Emitted when tokens are purchased
     * @param buyer The address of the buyer
     * @param amount The amount of tokens purchased
     */
    event TokensPurchased(address indexed buyer, uint256 amount);

    /**
     * @dev Emitted when the sale is stopped
     * @param totalFundsRaised The total funds raised during the sale
     */
    event SaleStopped(uint256 totalFundsRaised);

    /**
     * @dev Emitted when funds are withdrawn
     * @param amount The amount of funds withdrawn
     */
    event FundsWithdrawn(uint256 amount);

    /**
     * @dev Emitted when the beneficiary is changed
     * @param oldBeneficiary The address of the old beneficiary
     * @param newBeneficiary The address of the new beneficiary
     */
    event BeneficiaryChanged(address indexed oldBeneficiary, address indexed newBeneficiary);
}