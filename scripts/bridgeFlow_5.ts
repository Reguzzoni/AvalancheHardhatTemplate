import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    /*
    Starta il relayer prima di eseguire questo script. 
    */

    console.log("Approve token...");
    const coinContractAddress: string = "0x17724F88D2D9C214C1cecBE69f3F838eD56F1Be3";
    const lockingContractAddress: string = "0x3B21ccD89338c66A911a5a4edDf580FDC5Bfb0d3";

    const coinContract: any = await ethers.getContractAt("ExampleERC20", coinContractAddress);

    // Approva il locking contract a spendere i token
    const approveTx = await coinContract.approve(lockingContractAddress, ethers.utils.parseEther("10"));
    await approveTx.wait();
    console.log("Tokens approved for locking contract");

    console.log("Locking token...");
    const lockingContract: any = await ethers.getContractAt("LockingContract", lockingContractAddress);

    // lock token
    const lockTx = await lockingContract.lockTokens(ethers.utils.parseEther("10"));
    await lockTx.wait();

    console.log("Token locked");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
