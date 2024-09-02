import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    /*
    Crea minting token sulla rete Polygon. 
    */
    console.log("Deploying Coin contract...");
    const Coin = await ethers.getContractFactory("ExampleERC20");
    const coinContract: any = await Coin.deploy();

    await coinContract.deployed();
    console.log(`Coin deployed to: ${coinContract.address}`);

    console.log("Deploying minting contract...");
    const Minting = await ethers.getContractFactory("MintingContract");
    const mintingContract: any = await Minting.deploy(coinContract.address);

    await mintingContract.deployed();
    console.log(`Minting deployed to: ${mintingContract.address}`);
};

// coin contract address
//0x48C86663160B2914BA397118D838cF768A975E89

// minting contract address
// 0xfa1BFE3dCB6bFc49fca9bc355803D5C67054B457

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
