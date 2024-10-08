//SPDX-License-Identifier: MIT
pragma solidity >=0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleERC20 is ERC20, Ownable {
    string private TOKEN_NAME = "IEUR Token example";
    string private TOKEN_SYMBOL = "IEUR";

    uint256 private constant TOTAL_SUPPLY = 123456789;

    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner returns (bool) {
        _mint(to, amount);
        return true;
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
