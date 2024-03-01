// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IOwner {

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    function owner() external  view returns (address);
}