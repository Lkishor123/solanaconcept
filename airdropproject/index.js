const {
    Connection,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Generate a new wallet keypair
const wallet = Keypair.generate();

// Extract the public and secret keys
const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

// Function to get wallet balance
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error("Error getting wallet balance:", err);
    }
};

// Function to airdrop SOL
const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignature = await connection.requestAirdrop(
            publicKey,
            2 * LAMPORTS_PER_SOL
        );
        // Confirm the transaction
        await connection.confirmTransaction(fromAirDropSignature, 'confirmed');
    } catch (err) {
        console.error("Error during airdrop:", err);
    }
};

// Main function
const main = async () => {
    console.log("Public Key:", publicKey.toString());
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};

// Run the main function
main();
