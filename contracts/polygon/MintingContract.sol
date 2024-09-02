// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../c-chain/ExampleERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintingContract is Ownable {
    ExampleERC20 public token;
    address public lockingContractAddress;

    constructor(ExampleERC20 _token) {
        token = _token;
    }

    function mintTokens(address to, uint256 amount) external onlyOwner {
        require(
            ExampleERC20(address(token)).mint(to, amount),
            "Minting failed"
        );
    }

    function setLockingContract(address _lockingContract) external onlyOwner {
        lockingContractAddress = _lockingContract;
    }
}
