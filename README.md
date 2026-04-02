# n8n-nodes-chiliz-chain

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with Chiliz Chain, the leading blockchain platform for sports and entertainment fan tokens. This node provides access to 6 core resources including fan tokens, voting mechanisms, rewards, NFTs, team data, and transaction monitoring, enabling automated workflows for sports fan engagement and blockchain operations.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Chiliz-red)
![Sports](https://img.shields.io/badge/Sports-Fan%20Tokens-green)
![Web3](https://img.shields.io/badge/Web3-Ready-purple)

## Features

- **Fan Token Management** - Create, transfer, and monitor fan tokens for sports teams and entertainment brands
- **Voting Operations** - Manage fan voting campaigns and retrieve voting results and participation data
- **Reward Distribution** - Automate reward campaigns and track fan engagement rewards
- **NFT Integration** - Handle sports NFT collections, transfers, and metadata management
- **Team Data Access** - Retrieve comprehensive team information, statistics, and fan engagement metrics
- **Transaction Monitoring** - Track blockchain transactions, confirmations, and network activity
- **Real-time Updates** - Monitor live events and blockchain state changes
- **Comprehensive Error Handling** - Robust error management with detailed blockchain-specific error codes

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-chiliz-chain`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-chiliz-chain
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-chiliz-chain.git
cd n8n-nodes-chiliz-chain
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-chiliz-chain
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Chiliz Chain API key for authentication | Yes |
| Environment | Network environment (mainnet/testnet) | Yes |
| Rate Limit | Requests per minute limit | No |

## Resources & Operations

### 1. Fan Token

| Operation | Description |
|-----------|-------------|
| Get Token Info | Retrieve detailed information about a specific fan token |
| Transfer Token | Transfer fan tokens between addresses |
| Get Balance | Check fan token balance for an address |
| Get Transaction History | Retrieve token transfer history |
| Create Token | Create a new fan token (requires special permissions) |
| Update Metadata | Update token metadata and properties |

### 2. Voting

| Operation | Description |
|-----------|-------------|
| Create Vote | Create a new voting campaign for fans |
| Cast Vote | Submit a vote on behalf of a fan |
| Get Vote Results | Retrieve current or final voting results |
| List Active Votes | Get all currently active voting campaigns |
| Get Vote Details | Retrieve detailed information about a specific vote |
| End Vote | Conclude a voting campaign and finalize results |

### 3. Reward

| Operation | Description |
|-----------|-------------|
| Create Reward Campaign | Set up a new fan reward campaign |
| Distribute Rewards | Send rewards to eligible fans |
| Get Reward Status | Check the status of reward distributions |
| List User Rewards | Get rewards earned by a specific user |
| Update Campaign | Modify existing reward campaign parameters |
| Generate Report | Create detailed reward distribution reports |

### 4. NFT

| Operation | Description |
|-----------|-------------|
| Mint NFT | Create new sports or entertainment NFTs |
| Transfer NFT | Transfer NFT ownership between addresses |
| Get NFT Metadata | Retrieve NFT details and metadata |
| List Collection | Get all NFTs in a specific collection |
| Update NFT | Modify NFT properties and metadata |
| Burn NFT | Permanently remove an NFT from circulation |

### 5. Team

| Operation | Description |
|-----------|-------------|
| Get Team Info | Retrieve comprehensive team information |
| List Teams | Get all teams available on the platform |
| Get Team Stats | Fetch team performance and engagement statistics |
| Update Team Data | Modify team information and settings |
| Get Fan Metrics | Retrieve fan engagement metrics for a team |
| Sync Team Data | Synchronize team data with external sources |

### 6. Transaction

| Operation | Description |
|-----------|-------------|
| Get Transaction | Retrieve details of a specific transaction |
| List Transactions | Get transaction history with filtering options |
| Monitor Address | Track all transactions for a specific address |
| Get Network Stats | Retrieve blockchain network statistics |
| Estimate Gas | Calculate gas fees for transactions |
| Broadcast Transaction | Submit a signed transaction to the network |

## Usage Examples

```javascript
// Get fan token balance for a supporter
{
  "operation": "getBalance",
  "tokenAddress": "0x3506424F91fD33084466F402d5D97f05F8e3b4AF",
  "userAddress": "0x742d35Cc6634C0532925a3b8D45C16E6C0A5C4A"
}
```

```javascript
// Create a fan voting campaign
{
  "operation": "createVote",
  "title": "Choose Next Match Jersey Design",
  "description": "Vote for your favorite jersey design for the championship game",
  "options": ["Classic Blue", "Modern White", "Retro Red"],
  "endDate": "2024-12-31T23:59:59Z",
  "eligibilityTokens": ["FC_BARCELONA_TOKEN"]
}
```

```javascript
// Distribute rewards to active fans
{
  "operation": "distributeRewards",
  "campaignId": "reward_campaign_123",
  "recipients": [
    {"address": "0x742d35Cc6634C0532925a3b8D45C16E6C0A5C4A", "amount": 100},
    {"address": "0x8ba1f109551bD432803012645Hac136c54F8B83E", "amount": 150}
  ],
  "tokenType": "CHZ"
}
```

```javascript
// Mint team NFT collection
{
  "operation": "mintNFT",
  "collectionAddress": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  "recipient": "0x742d35Cc6634C0532925a3b8D45C16E6C0A5C4A",
  "metadata": {
    "name": "Champions League Winner 2024",
    "description": "Commemorative NFT for championship victory",
    "image": "https://ipfs.io/ipfs/QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx"
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and has required permissions |
| Insufficient Balance | Account lacks required tokens for operation | Check token balance and ensure sufficient funds |
| Network Congestion | High gas fees or slow transaction processing | Retry with higher gas price or wait for network to clear |
| Invalid Address Format | Blockchain address format is incorrect | Validate address format matches Chiliz Chain standards |
| Token Not Found | Specified fan token does not exist | Verify token contract address and deployment status |
| Rate Limit Exceeded | Too many API requests in time window | Implement request throttling and respect rate limits |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-chiliz-chain/issues)
- **Chiliz Chain Documentation**: [docs.chiliz.com](https://docs.chiliz.com)
- **Fan Token API Reference**: [developers.chiliz.com](https://developers.chiliz.com)