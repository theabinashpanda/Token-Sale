// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IOwner.sol";

/**
 * @title Owner contract to manage ownership functionality
 * @author https://gitlab.mindfire.co.in/abinash.p
 * @author https://github.com/theabinashpanda
 */
contract Owner is IOwner{
    address private _owner; // Address of the owner

    /// @dev Throws if called by any account other than the owner
    modifier onlyOwner() {
        require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    /// @dev Sets the contract deployer as the initial owner
    constructor() {
        _owner = msg.sender;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param newOwner The address to transfer ownership to. 
     */
    function transferOwnership(address newOwner) public onlyOwner returns (bool) {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        require(newOwner != _owner, "Ownable: new owner is already the current owner");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
        return true;
    }

    /**
     * @dev Returns the address of the current owner.
     * @return The address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }
    
}