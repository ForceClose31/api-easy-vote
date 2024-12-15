const ethers = require("ethers");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
    "function castVote(uint candidateId) public",
    "function getCandidate(uint candidateId) public view returns (tuple(uint id, string name, string visi, string misi, uint voteCount))",
    "function addCandidate(string memory name, string memory visi, string memory misi)",
];

const voteContract = new ethers.Contract(contractAddress, abi, wallet);

async function addCandidateToBlockchain(name, visi, misi) {
    try {
        const tx = await voteContract.addCandidate(name, visi, misi);
        await tx.wait(); 
        console.log('Candidate added to blockchain:', name);
    } catch (error) {
        console.error('Error adding candidate to blockchain:', error.message);
    }
}

async function castVoteBlockchain(candidateId) {
    try {
        const tx = await voteContract.castVote(candidateId);
        await tx.wait();

        const receipt = await provider.getTransactionReceipt(tx.hash);

        console.log(`Vote cast for candidate ID: ${candidateId}`);
        
        return {
            transactionHash: tx.hash,
            blockNumber: receipt.blockNumber
        };
        
    } catch (error) {
        console.error(`Error casting vote: ${error.message}`);
    }
}

module.exports = { castVoteBlockchain, addCandidateToBlockchain };
