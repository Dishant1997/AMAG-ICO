// SPDX-License-Identifier: MIT

// pragma solidity >=0.5.0;
pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

contract AINCToken is ERC20, ERC20Detailed, ERC20Pausable{


    constructor(string memory name, string memory symbol, uint8 decimals)
    ERC20Detailed(name, symbol, decimals) public{

        // _mint(msg.sender, ICO_SUPP);
        // _transfer(msg.sender, TEAM, TEAM_SUPP);
    }
}