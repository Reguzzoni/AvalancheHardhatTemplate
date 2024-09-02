import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    // transfer owner ship to relayer
    console.log("Transfering ownership to relayer / minting address ...");
    const coinContractAddress: string = "0x48C86663160B2914BA397118D838cF768A975E89";
    const mintingContractAddress: string = "0xfa1BFE3dCB6bFc49fca9bc355803D5C67054B457";
    const coinContract: any = await ethers.getContractAt("ExampleERC20", coinContractAddress);

    // transfer ownership
    const transferOwnershipTx = await coinContract.transferOwnership(mintingContractAddress);
    await transferOwnershipTx.wait();
    console.log("Ownership transfered to relayer / minting address");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
