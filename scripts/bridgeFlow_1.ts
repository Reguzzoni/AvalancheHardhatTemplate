import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    /*
    Deploya il contratto ERC20 sulla rete Avalanche Fuji.
    Deploy del Contratto di Locking su Avalanche Fuji:
    */
    console.log("Deploying Coin contract...");
    const Coin = await ethers.getContractFactory("ExampleERC20");
    const coinContract: any = await Coin.deploy();

    await coinContract.deployed();
    console.log(`Coin deployed to: ${coinContract.address}`);

    console.log("Deploying Locking contract...");
    const Locking = await ethers.getContractFactory("LockingContract");
    const lockingContract: any = await Locking.deploy(coinContract.address);

    await lockingContract.deployed();
    console.log(`Locking deployed to: ${lockingContract.address}`);
};

// coin contract address
// 0x17724F88D2D9C214C1cecBE69f3F838eD56F1Be3

// locking contract address
// 0x3B21ccD89338c66A911a5a4edDf580FDC5Bfb0d3

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
