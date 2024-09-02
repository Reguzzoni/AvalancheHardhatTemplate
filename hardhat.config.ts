import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";

dotenv.config();

const FORK_FUJI = false;
const FORK_MAINNET = false;
const forkingData = FORK_FUJI
    ? {
          url: "https://api.avax-test.network/ext/bc/C/rpc",
      }
    : FORK_MAINNET
    ? {
          url: "https://api.avax.network/ext/bc/C/rpc",
      }
    : undefined;

task("accounts", "Prints the list of accounts", async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    accounts.forEach((account: SignerWithAddress): void => {
        console.log(account.address);
    });
});

console.log("Private keys from ENV: ", process.env.PRIVATE_KEY_1);
const privateKeys = [
    process.env.PRIVATE_KEY_1 || "",
    // Aggiungi altre chiavi private se necessario
].filter((key) => key !== "");

console.log("Private keys: ", privateKeys);

export default {
    solidity: {
        compilers: [
            {
                version: "0.5.16",
            },
            {
                version: "0.6.2",
            },
            {
                version: "0.6.4",
            },
            {
                version: "0.7.0",
            },
            {
                version: "0.8.0",
            },
        ],
    },
    networks: {
        hardhat: {
            gasPrice: 225000000000,
            chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
            forking: forkingData,
        },
        local: {
            url: "http://localhost:9650/ext/bc/C/rpc",
            gasPrice: 225000000000,
            chainId: 43112,
            accounts: privateKeys,
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            gasPrice: 225000000000,
            chainId: 43113,
            accounts: privateKeys,
        },
        mainnet: {
            url: `https://api.avax.network/ext/bc/C/rpc`,
            gasPrice: 225000000000,
            chainId: 43114,
            accounts: privateKeys,
        },
    },
};
