import { ethers } from "hardhat";

const main = async (): Promise<void> => {
    console.log("Minting token on fuji...");
    const coinContractAddress: string = "0x17724F88D2D9C214C1cecBE69f3F838eD56F1Be3";
    const coinContract: any = await ethers.getContractAt("ExampleERC20", coinContractAddress);

    // mint token
    const mintTx = await coinContract.mint(
        "0x1a421F1302405fcE4cEeDFA27a2D5f4b4a6aea29",
        ethers.utils.parseEther("100")
    );
    await mintTx.wait();
    console.log("Token minted on fuji");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
