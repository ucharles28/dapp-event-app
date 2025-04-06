// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {DecentralizedEvent} from "../src/DecentralizedEvent.sol";

contract DeployDecentralizedEvent is Script {
    function run() external {
        vm.startBroadcast();
        new DecentralizedEvent();
        vm.stopBroadcast();
    }
}