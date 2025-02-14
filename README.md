# Arweave Starter Kit

A comprehensive starter kit for building decentralized applications on Arweave using React, Vite, and three powerful SDKs:

- [Arweave Wallet Kit](https://docs.arweavekit.com/arweave-wallet-kit/introduction) - Unified wallet interaction
- [AR.IO SDK](https://docs.ar.io/build/ar-io-sdk/getting-started) - Gateway and name system integration
- [Turbo SDK](https://docs.ardrive.io/docs/turbo/turbo-sdk/#installation) - Fast and efficient data uploads

## Prerequisites

- Node.js 16+
- Package manager (pnpm or yarn)
- An Arweave wallet (JSON file)
- An AR.IO name (get one at https://arns.app)

## Features

- 🔐 **Wallet Integration** - Seamless wallet connection with Arweave Wallet Kit
- 📝 **Name System** - AR.IO name system integration for human-readable addresses
- 🚀 **Fast Uploads** - Turbo-powered deployments for efficient data uploads
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS
- 📱 **Mobile Ready** - Fully responsive design that works on all devices
- 🛠️ **Developer Tools** - Comprehensive scripts for deployment and management
- 🔗 **Hash Routing** - Client-side routing that works with Arweave's permanent storage

## Quick Start

1. Clone the repository
2. Install dependencies:
```bash
# Using pnpm
pnpm install

# OR using yarn
yarn install
```
3. Place your Arweave wallet file in the project root as `wallet.json`
4. Start the development server:
```bash
pnpm dev  # or yarn dev
```

## SDK Integration

### Arweave Wallet Kit
- Handles wallet connections and transactions
- Provides React hooks for wallet state
- Manages wallet permissions and address access

### AR.IO SDK
- Manages AR.IO name system integration
- Handles record updates and primary name resolution
- Provides gateway integration features

### Turbo SDK
- Powers fast and efficient deployments
- Handles manifest generation
- Manages data uploads to Arweave

## Available Scripts

### Development
```bash
# Start development server
pnpm dev  # or yarn dev

# Build for production
pnpm build  # or yarn build

# Preview production build
pnpm preview  # or yarn preview
```

### Deployment Scripts

#### Deploy to Arweave
```bash
pnpm deploy  # or yarn deploy
```
This will:
- Build your application
- Upload to Arweave via Turbo
- Generate a manifest file
- Provide a deployment URL: `https://arweave.net/{manifestId}`

#### Update AR.IO Name
```bash
pnpm arns  # or yarn arns
```
This will:
- Update your AR.IO name with the latest deployment
- Make your site available at: `https://{your-name}.ar.io`

#### View AR.IO Records
```bash
pnpm records  # or yarn records
```
Shows all records associated with your AR.IO name.

#### Get Primary Name
```bash
pnpm primary <arweave-address>  # or yarn primary <arweave-address>
```
Looks up the primary name for any Arweave address.

## Development Workflow

1. Make changes to your application
2. Test locally with `pnpm dev`
3. Build with `pnpm build`
4. Deploy with `pnpm deploy`
5. Update AR.IO name with `pnpm arns`
6. Verify records with `pnpm records`

## Important Notes

- Never commit your `wallet.json` to version control
- Keep your manifest ID after deployment
- AR.IO name updates may take a few minutes to propagate
- Default TTL for name records is 15 minutes
- Ensure proper permissions are granted when connecting wallets

## Troubleshooting

- If deployment fails, check your wallet balance
- If name updates fail, verify your AR.IO name ownership
- For wallet connection issues, ensure proper permissions
- Check the console for detailed error messages

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.# arweave-dapp-starter-kit
