import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    console.log("Deploying contract...");
    const Coin = await ethers.getContractFactory("ExampleERC20");
    const coinContract: any = await Coin.deploy();

    await coinContract.deployed();
    console.log(`Coin deployed to: ${coinContract.address}`);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
