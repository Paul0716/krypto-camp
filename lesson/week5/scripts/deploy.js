const { ethers, upgrades } = require("hardhat");


async function main() {
  const CounterUpgradable = await ethers.getContractFactory("Counter");
  const counterUpgradable = await upgrades.deployProxy(CounterUpgradable);

  await counterUpgradable.deployed();
  console.log("Counter deployed to:", counterUpgradable.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
