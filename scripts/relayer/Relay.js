const { ethers } = require("ethers");
const fs = require("fs");

// Provider per Avalanche e Sepolia
const providerAvalanche = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
const providerSepolia = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

// Carica gli ABI
const lockingContractFile = JSON.parse(fs.readFileSync("./abi/LockingContract.json"));
const mintingContractFile = JSON.parse(fs.readFileSync("./abi/MintingContract.json"));

const lockingContractABI = lockingContractFile.abi;
const mintingContractABI = mintingContractFile.abi;

const lockingContractAddress = "0x3B21ccD89338c66A911a5a4edDf580FDC5Bfb0d3";
const mintingContractAddress = "0xfa1BFE3dCB6bFc49fca9bc355803D5C67054B457";

// Inizializza i contratti
const lockingContract = new ethers.Contract(lockingContractAddress, lockingContractABI, providerAvalanche);
const mintingContract = new ethers.Contract(mintingContractAddress, mintingContractABI, providerSepolia);

// Aggiungi un wallet con il provider Sepolia
const privateKey = process.env.PRIVATE_KEY;

console.log("Private key:", privateKey);
const wallet = new ethers.Wallet(privateKey, providerSepolia);
console.log("Wallet address:", wallet.address);
const mintingContractWithSigner = mintingContract.connect(wallet);

const gasLimit = 1000000; // Prova con un limite di gas alto, ma ragionevole

async function relay() {
    console.log("Relayer started");

    console.log("Owner of minting contract:", await mintingContract.owner());

    // Funzione per il relay
    console.log(
        "relay minting address ",
        mintingContract.address,
        " by relay on Sepolia for coin address",
        await mintingContract.token()
    );

    // Ascolta gli eventi di locking su Avalanche
    lockingContract.on("LockedTokens", async (user, amount) => {
        console.log(`LockedTokens event received: ${user} ${amount}`);
        // Chiamata al contratto di minting su Sepolia con il signer
        try {
            const tx = await mintingContractWithSigner.mintTokens(user, amount, { gasLimit });
            await tx.wait();
            console.log(`Minted ${amount} tokens to ${user}`);
        } catch (error) {
            console.error("Error minting tokens:", error);
        }
    });
}

relay();
