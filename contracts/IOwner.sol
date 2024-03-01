// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title IOwner
 * @dev Interface for contracts with ownership functionality.
 */
interface IOwner {
    /**
     * @dev Emitted when ownership is transferred.
     * @param previousOwner The address of the previous owner.
     * @param newOwner The address of the new owner.
     */
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param newOwner The address to transfer ownership to. 
     */
    function transferOwnership(address newOwner) external returns (bool) ;

    /**
     * @dev Retrieves the current owner.
     * @return The address of the owner.
     */
    function owner() external view returns (address);
}
