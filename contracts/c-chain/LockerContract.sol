// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LockingContract {
    IERC20 public token;
    address public admin;

    constructor(IERC20 _token) {
        token = _token;
        admin = msg.sender;
    }

    // event
    event LockedTokens(address indexed from, uint256 amount);

    function lockTokens(uint256 amount) external {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        // Emit event or call relayer to handle the minting on Polygon
        emit LockedTokens(msg.sender, amount);
    }
}
