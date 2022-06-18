const { ethers, upgrades } = require("hardhat");


async function main() {
  const CounterV2 = await ethers.getContractFactory("CounterV2");
  const proxy = await upgrades.upgradeProxy("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", CounterV2);

  await proxy.deployed();
  console.log("CounterV2 deployed to:", proxy.address);
}

// async function main() {
//   const CounterV2 = await ethers.getContractFactory("CounterV2");
//   const proxy = await upgrades.upgradeProxy(COUNTER_ADDRESS, CounterV2);
//   console.log("Counter upgraded");
// }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
