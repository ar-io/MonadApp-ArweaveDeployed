import fs from 'fs';
import { ANT, ArweaveSigner } from '@ar.io/sdk';

async function setUndername() {
    try {
        // Check for wallet.json
        if (!fs.existsSync('./wallet.json')) {
            throw new Error('wallet.json not found in the root of your project');
        }
        
        // Get transaction ID from environment variable or use command line argument
        // This is the deployed Arweave app ID from your npm run deploy command
        const targetTransactionId = process.env.TRANSACTION_ID || process.argv[2];
        
        if (!targetTransactionId) {
            throw new Error('No transaction ID provided. Set TRANSACTION_ID environment variable or provide as command line argument: npm run set-undername <YOUR_TRANSACTION_ID>');
        }
        
        console.log(`Using target transaction ID: ${targetTransactionId}`);

        const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
        
        // Initialize the ANT with the correct process ID
        // IMPORTANT: This is the official ARNS process ID - do not change this
        // unless you know what you're doing
        const ant = ANT.init({
            signer: new ArweaveSigner(jwk),
            processId: 'sp8HiziIh6q02AfM0F6TQsj5o9L77x3cD_-o0iyQC2U'
        });

        // Set your custom undername here
        // This will be the prefix for your app URL: https://{YOUR_UNDERNAME}_{primaryname}.ar.io
        // CUSTOMIZE THIS: Choose a unique, descriptive name for your app
        const undername = process.env.UNDERNAME || 'YOUR_APP_NAME_HERE';
        console.log(`Setting undername: ${undername}`);

        // Following the exact structure from the docs
        const { id: txId } = await ant.setUndernameRecord({
            undername: undername,
            transactionId: targetTransactionId,
            ttlSeconds: 900 // 15 minutes (within the valid range of 60-86400 seconds)
        }, 
        // Optional additional tags - you can customize these
        { tags: [{ name: 'App-Name', value: 'Monad-Stake-App' }] });

        console.log('\nUndername Record Update Complete! 🎉');
        console.log(`Transaction ID: ${txId}`);
        
        // Find the wallet address to provide helpful information
        const walletAddress = await new ArweaveSigner(jwk).getAddress();
        console.log('\nTo check your primary name:');
        console.log(`npm run primary ${walletAddress}`);
        
        console.log('\nOnce propagated, your app will be available at:');
        console.log(`https://${undername}_<your-primary-name>.ar.io`);
        console.log('(Replace <your-primary-name> with your actual ARNS primary name)');
        
    } catch (error) {
        console.error('Failed to update undername record:', error);
        
        if (error.message.includes('wallet.json not found')) {
            console.error('\nMake sure you have an Arweave wallet file named "wallet.json" in the root of your project.');
            console.error('You can generate one at https://arweave.app/add or migrate from another wallet.');
        }
        
        if (error.message.includes('No transaction ID provided')) {
            console.error('\nExample usage:');
            console.error('TRANSACTION_ID=YOUR_MANIFEST_TX_ID npm run set-undername');
            console.error('-- OR --');
            console.error('npm run set-undername YOUR_MANIFEST_TX_ID');
        }
        
        process.exit(1);
    }
}

setUndername();
