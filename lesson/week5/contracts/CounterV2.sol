// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract CounterV2 is Initializable  {
    uint256 public counter;
    string public value;

    function initialize() public initializer {
        counter = 0;
    }

    function setIncrement() external {
        counter += 1;
    }

    function setValue(string memory newValue) external {
        value = newValue;
    }
}