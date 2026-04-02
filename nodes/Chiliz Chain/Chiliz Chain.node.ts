/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-chilizchain/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class ChilizChain implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chiliz Chain',
    name: 'chilizchain',
    icon: 'file:chilizchain.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Chiliz Chain API',
    defaults: {
      name: 'Chiliz Chain',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'chilizchainApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'FanToken',
            value: 'fanToken',
          },
          {
            name: 'Voting',
            value: 'voting',
          },
          {
            name: 'Reward',
            value: 'reward',
          },
          {
            name: 'Nft',
            value: 'nft',
          },
          {
            name: 'Team',
            value: 'team',
          },
          {
            name: 'Transaction',
            value: 'transaction',
          }
        ],
        default: 'fanToken',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['fanToken'],
		},
	},
	options: [
		{
			name: 'Get All Tokens',
			value: 'getAllTokens',
			description: 'Retrieve all available fan tokens',
			action: 'Get all fan tokens',
		},
		{
			name: 'Get Token',
			value: 'getToken',
			description: 'Get specific fan token details',
			action: 'Get a fan token',
		},
		{
			name: 'Get Token Holders',
			value: 'getTokenHolders',
			description: 'Get token holder information',
			action: 'Get token holders',
		},
		{
			name: 'Get Token Supply',
			value: 'getTokenSupply',
			description: 'Get total and circulating supply',
			action: 'Get token supply',
		},
		{
			name: 'Transfer Token',
			value: 'transferToken',
			description: 'Transfer fan tokens between addresses',
			action: 'Transfer fan token',
		},
		{
			name: 'Get User Tokens',
			value: 'getUserTokens',
			description: 'Get user\'s fan token balances',
			action: 'Get user tokens',
		},
	],
	default: 'getAllTokens',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['voting'] } },
	options: [
		{ name: 'Get All Polls', value: 'getAllPolls', description: 'Retrieve all active and past polls', action: 'Get all polls' },
		{ name: 'Get Poll', value: 'getPoll', description: 'Get specific poll details and results', action: 'Get a poll' },
		{ name: 'Cast Vote', value: 'castVote', description: 'Submit a vote for a poll', action: 'Cast a vote' },
		{ name: 'Get Poll Results', value: 'getPollResults', description: 'Get detailed voting results', action: 'Get poll results' },
		{ name: 'Get User Votes', value: 'getUserVotes', description: 'Get user\'s voting history', action: 'Get user votes' },
		{ name: 'Create Poll', value: 'createPoll', description: 'Create a new poll (team admin only)', action: 'Create a poll' },
	],
	default: 'getAllPolls',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['reward'],
		},
	},
	options: [
		{
			name: 'Get All Rewards',
			value: 'getAllRewards',
			description: 'Get available rewards and campaigns',
			action: 'Get all rewards',
		},
		{
			name: 'Get Reward',
			value: 'getReward',
			description: 'Get specific reward details',
			action: 'Get a reward',
		},
		{
			name: 'Claim Reward',
			value: 'claimReward',
			description: 'Claim an available reward',
			action: 'Claim a reward',
		},
		{
			name: 'Get User Rewards',
			value: 'getUserRewards',
			description: 'Get user\'s reward history and claimable rewards',
			action: 'Get user rewards',
		},
		{
			name: 'Get Reward Campaigns',
			value: 'getRewardCampaigns',
			description: 'Get active reward campaigns',
			action: 'Get reward campaigns',
		},
		{
			name: 'Distribute Rewards',
			value: 'distributeRewards',
			description: 'Distribute rewards to eligible users (admin only)',
			action: 'Distribute rewards',
		},
	],
	default: 'getAllRewards',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['nft'],
		},
	},
	options: [
		{
			name: 'Get All NFTs',
			value: 'getAllNfts',
			description: 'Retrieve all NFTs in the ecosystem',
			action: 'Get all NFTs',
		},
		{
			name: 'Get NFT',
			value: 'getNft',
			description: 'Get specific NFT details and metadata',
			action: 'Get NFT',
		},
		{
			name: 'Mint NFT',
			value: 'mintNft',
			description: 'Mint new NFT (authorized users only)',
			action: 'Mint NFT',
		},
		{
			name: 'Transfer NFT',
			value: 'transferNft',
			description: 'Transfer NFT between addresses',
			action: 'Transfer NFT',
		},
		{
			name: 'Get NFT Collections',
			value: 'getNftCollections',
			description: 'Get available NFT collections',
			action: 'Get NFT collections',
		},
		{
			name: 'Get User NFTs',
			value: 'getUserNfts',
			description: 'Get user\'s NFT collection',
			action: 'Get user NFTs',
		},
		{
			name: 'Get NFT History',
			value: 'getNftHistory',
			description: 'Get NFT transaction history',
			action: 'Get NFT history',
		},
	],
	default: 'getAllNfts',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['team'] } },
  options: [
    { name: 'Get All Teams', value: 'getAllTeams', description: 'Get all available sports teams', action: 'Get all teams' },
    { name: 'Get Team', value: 'getTeam', description: 'Get specific team details and stats', action: 'Get team details' },
    { name: 'Get Team Fans', value: 'getTeamFans', description: 'Get team\'s fan base information', action: 'Get team fans' },
    { name: 'Get Team Engagement', value: 'getTeamEngagement', description: 'Get fan engagement metrics', action: 'Get team engagement' },
    { name: 'Get Team News', value: 'getTeamNews', description: 'Get team-related news and updates', action: 'Get team news' },
    { name: 'Follow Team', value: 'followTeam', description: 'Follow a team (user action)', action: 'Follow team' },
  ],
  default: 'getAllTeams',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['transaction'] } },
  options: [
    { name: 'Get All Transactions', value: 'getAllTransactions', description: 'Get transaction history', action: 'Get all transactions' },
    { name: 'Get Transaction', value: 'getTransaction', description: 'Get specific transaction details', action: 'Get transaction details' },
    { name: 'Get Pending Transactions', value: 'getPendingTransactions', description: 'Get pending transactions', action: 'Get pending transactions' },
    { name: 'Broadcast Transaction', value: 'broadcastTransaction', description: 'Broadcast signed transaction to network', action: 'Broadcast transaction' },
    { name: 'Get Block', value: 'getBlock', description: 'Get block information', action: 'Get block information' },
    { name: 'Get Latest Block', value: 'getLatestBlock', description: 'Get latest block information', action: 'Get latest block' },
  ],
  default: 'getAllTransactions',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 50,
	description: 'Number of results to return',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['getAllTokens', 'getTokenHolders'],
		},
	},
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'Number of results to skip',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['getAllTokens', 'getTokenHolders'],
		},
	},
},
{
	displayName: 'Team ID',
	name: 'teamId',
	type: 'string',
	default: '',
	description: 'Filter tokens by specific team ID',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['getAllTokens'],
		},
	},
},
{
	displayName: 'Token ID',
	name: 'tokenId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the fan token',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['getToken', 'getTokenHolders', 'getTokenSupply', 'transferToken'],
		},
	},
},
{
	displayName: 'From Address',
	name: 'from',
	type: 'string',
	required: true,
	default: '',
	description: 'The sender wallet address',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['transferToken'],
		},
	},
},
{
	displayName: 'To Address',
	name: 'to',
	type: 'string',
	required: true,
	default: '',
	description: 'The recipient wallet address',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['transferToken'],
		},
	},
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	default: '',
	description: 'Amount of tokens to transfer',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['transferToken'],
		},
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	default: '',
	description: 'The user wallet address',
	displayOptions: {
		show: {
			resource: ['fanToken'],
			operation: ['getUserTokens'],
		},
	},
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: { show: { resource: ['voting'], operation: ['getAllPolls'] } },
	options: [
		{ name: 'Active', value: 'active' },
		{ name: 'Completed', value: 'completed' },
		{ name: 'All', value: 'all' },
	],
	default: 'all',
	description: 'Filter polls by status',
},
{
	displayName: 'Team ID',
	name: 'teamId',
	type: 'string',
	displayOptions: { show: { resource: ['voting'], operation: ['getAllPolls'] } },
	default: '',
	description: 'Filter polls by team ID',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: { show: { resource: ['voting'], operation: ['getAllPolls', 'getUserVotes'] } },
	default: 20,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: { show: { resource: ['voting'], operation: ['getAllPolls', 'getUserVotes'] } },
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Poll ID',
	name: 'pollId',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['getPoll', 'castVote', 'getPollResults'] } },
	default: '',
	description: 'The ID of the poll',
},
{
	displayName: 'Option',
	name: 'option',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['castVote'] } },
	default: '',
	description: 'The voting option to select',
},
{
	displayName: 'Signature',
	name: 'signature',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['castVote'] } },
	default: '',
	description: 'Cryptographic signature for vote verification',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['castVote', 'getUserVotes'] } },
	default: '',
	description: 'Wallet address of the voter',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['createPoll'] } },
	default: '',
	description: 'Title of the poll',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['createPoll'] } },
	default: '',
	description: 'Description of the poll',
},
{
	displayName: 'Options',
	name: 'options',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['createPoll'] } },
	default: '',
	description: 'Comma-separated list of voting options',
},
{
	displayName: 'End Time',
	name: 'endTime',
	type: 'dateTime',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['createPoll'] } },
	default: '',
	description: 'When the poll should end',
},
{
	displayName: 'Team ID',
	name: 'createTeamId',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['voting'], operation: ['createPoll'] } },
	default: '',
	description: 'ID of the team creating the poll',
},
{
	displayName: 'Team ID',
	name: 'teamId',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getAllRewards', 'getRewardCampaigns'],
		},
	},
	default: '',
	description: 'Filter by specific team ID',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	required: false,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getAllRewards', 'getUserRewards'],
		},
	},
	options: [
		{
			name: 'Active',
			value: 'active',
		},
		{
			name: 'Completed',
			value: 'completed',
		},
		{
			name: 'Expired',
			value: 'expired',
		},
		{
			name: 'Claimed',
			value: 'claimed',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
	],
	default: 'active',
	description: 'Filter by reward status',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getAllRewards'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getAllRewards'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Reward ID',
	name: 'rewardId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getReward', 'claimReward'],
		},
	},
	default: '',
	description: 'The ID of the reward',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['claimReward', 'getUserRewards'],
		},
	},
	default: '',
	description: 'Wallet address for reward operations',
},
{
	displayName: 'Signature',
	name: 'signature',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['claimReward'],
		},
	},
	default: '',
	description: 'Cryptographic signature for reward claim verification',
},
{
	displayName: 'Active',
	name: 'active',
	type: 'boolean',
	required: false,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['getRewardCampaigns'],
		},
	},
	default: true,
	description: 'Filter for active campaigns only',
},
{
	displayName: 'Campaign ID',
	name: 'campaignId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['distributeRewards'],
		},
	},
	default: '',
	description: 'ID of the reward campaign for distribution',
},
{
	displayName: 'Recipients',
	name: 'recipients',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['distributeRewards'],
		},
	},
	default: '[]',
	description: 'Array of wallet addresses to receive rewards',
},
{
	displayName: 'Amounts',
	name: 'amounts',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['reward'],
			operation: ['distributeRewards'],
		},
	},
	default: '[]',
	description: 'Array of reward amounts corresponding to recipients',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getAllNfts'],
		},
	},
	default: '',
	description: 'Filter NFTs by collection ID',
},
{
	displayName: 'Owner',
	name: 'owner',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getAllNfts'],
		},
	},
	default: '',
	description: 'Filter NFTs by owner address',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getAllNfts'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getAllNfts'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Token ID',
	name: 'tokenId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNft'],
		},
	},
	default: '',
	description: 'The NFT token ID',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNft'],
		},
	},
	default: '',
	description: 'The collection ID containing the NFT',
},
{
	displayName: 'To Address',
	name: 'to',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['mintNft'],
		},
	},
	default: '',
	description: 'Address to mint the NFT to',
},
{
	displayName: 'Metadata',
	name: 'metadata',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['mintNft'],
		},
	},
	default: '{}',
	description: 'NFT metadata as JSON object',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['mintNft'],
		},
	},
	default: '',
	description: 'Collection ID to mint the NFT in',
},
{
	displayName: 'From Address',
	name: 'from',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['transferNft'],
		},
	},
	default: '',
	description: 'Address to transfer the NFT from',
},
{
	displayName: 'To Address',
	name: 'to',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['transferNft'],
		},
	},
	default: '',
	description: 'Address to transfer the NFT to',
},
{
	displayName: 'Token ID',
	name: 'tokenId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['transferNft'],
		},
	},
	default: '',
	description: 'Token ID of the NFT to transfer',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['transferNft'],
		},
	},
	default: '',
	description: 'Collection ID containing the NFT',
},
{
	displayName: 'Team ID',
	name: 'teamId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNftCollections'],
		},
	},
	default: '',
	description: 'Filter collections by team ID',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNftCollections'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNftCollections'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getUserNfts'],
		},
	},
	default: '',
	description: 'User wallet address',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getUserNfts'],
		},
	},
	default: '',
	description: 'Filter by specific collection ID',
},
{
	displayName: 'Token ID',
	name: 'tokenId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNftHistory'],
		},
	},
	default: '',
	description: 'Token ID to get transaction history for',
},
{
	displayName: 'Collection ID',
	name: 'collectionId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['nft'],
			operation: ['getNftHistory'],
		},
	},
	default: '',
	description: 'Collection ID containing the NFT',
},
{
  displayName: 'Sport',
  name: 'sport',
  type: 'string',
  displayOptions: { show: { resource: ['team'], operation: ['getAllTeams'] } },
  default: '',
  description: 'Filter teams by sport',
},
{
  displayName: 'League',
  name: 'league',
  type: 'string',
  displayOptions: { show: { resource: ['team'], operation: ['getAllTeams'] } },
  default: '',
  description: 'Filter teams by league',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['team'], operation: ['getAllTeams', 'getTeamFans', 'getTeamNews'] } },
  default: 50,
  description: 'Number of results to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: { show: { resource: ['team'], operation: ['getAllTeams', 'getTeamFans', 'getTeamNews'] } },
  default: 0,
  description: 'Number of results to skip',
},
{
  displayName: 'Team ID',
  name: 'teamId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['team'], operation: ['getTeam', 'getTeamFans', 'getTeamEngagement', 'getTeamNews', 'followTeam'] } },
  default: '',
  description: 'The ID of the team',
},
{
  displayName: 'Period',
  name: 'period',
  type: 'options',
  displayOptions: { show: { resource: ['team'], operation: ['getTeamEngagement'] } },
  options: [
    { name: '24 Hours', value: '24h' },
    { name: '7 Days', value: '7d' },
    { name: '30 Days', value: '30d' },
    { name: '90 Days', value: '90d' },
    { name: '1 Year', value: '1y' },
  ],
  default: '30d',
  description: 'Time period for engagement metrics',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['team'], operation: ['followTeam'] } },
  default: '',
  description: 'Wallet address to follow the team',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['team'], operation: ['followTeam'] } },
  default: '',
  description: 'Wallet signature for following the team',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  displayOptions: { show: { resource: ['transaction'], operation: ['getAllTransactions'] } },
  default: '',
  description: 'Wallet address to filter transactions',
  placeholder: '0x...',
},
{
  displayName: 'Transaction Type',
  name: 'type',
  type: 'options',
  displayOptions: { show: { resource: ['transaction'], operation: ['getAllTransactions'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Transfer', value: 'transfer' },
    { name: 'Vote', value: 'vote' },
    { name: 'Stake', value: 'stake' },
    { name: 'Unstake', value: 'unstake' },
  ],
  default: '',
  description: 'Filter transactions by type',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['transaction'], operation: ['getAllTransactions'] } },
  typeOptions: { minValue: 1, maxValue: 100 },
  default: 20,
  description: 'Number of transactions to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: { show: { resource: ['transaction'], operation: ['getAllTransactions'] } },
  typeOptions: { minValue: 0 },
  default: 0,
  description: 'Number of transactions to skip',
},
{
  displayName: 'Transaction Hash',
  name: 'txHash',
  type: 'string',
  displayOptions: { show: { resource: ['transaction'], operation: ['getTransaction'] } },
  default: '',
  required: true,
  description: 'The transaction hash to lookup',
  placeholder: '0x...',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  displayOptions: { show: { resource: ['transaction'], operation: ['getPendingTransactions'] } },
  default: '',
  description: 'Wallet address to filter pending transactions',
  placeholder: '0x...',
},
{
  displayName: 'Transaction Type',
  name: 'type',
  type: 'options',
  displayOptions: { show: { resource: ['transaction'], operation: ['getPendingTransactions'] } },
  options: [
    { name: 'All', value: '' },
    { name: 'Transfer', value: 'transfer' },
    { name: 'Vote', value: 'vote' },
    { name: 'Stake', value: 'stake' },
    { name: 'Unstake', value: 'unstake' },
  ],
  default: '',
  description: 'Filter pending transactions by type',
},
{
  displayName: 'Signed Transaction',
  name: 'signedTx',
  type: 'string',
  displayOptions: { show: { resource: ['transaction'], operation: ['broadcastTransaction'] } },
  default: '',
  required: true,
  description: 'The signed transaction data to broadcast',
  typeOptions: { rows: 4 },
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  displayOptions: { show: { resource: ['transaction'], operation: ['getBlock'] } },
  default: '',
  required: true,
  description: 'The block number to lookup (number or "latest")',
  placeholder: '12345 or latest',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'fanToken':
        return [await executeFanTokenOperations.call(this, items)];
      case 'voting':
        return [await executeVotingOperations.call(this, items)];
      case 'reward':
        return [await executeRewardOperations.call(this, items)];
      case 'nft':
        return [await executeNftOperations.call(this, items)];
      case 'team':
        return [await executeTeamOperations.call(this, items)];
      case 'transaction':
        return [await executeTransactionOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeFanTokenOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('chilizchainApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllTokens': {
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const teamId = this.getNodeParameter('teamId', i) as string;

					let url = `${credentials.baseUrl}/tokens?limit=${limit}&offset=${offset}`;
					if (teamId) {
						url += `&team_id=${teamId}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getToken': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/${tokenId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTokenHolders': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/${tokenId}/holders?limit=${limit}&offset=${offset}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTokenSupply': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tokens/${tokenId}/supply`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'transferToken': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/tokens/transfer`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							tokenId,
							from,
							to,
							amount,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUserTokens': {
					const address = this.getNodeParameter('address', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/users/${address}/tokens`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeVotingOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('chilizchainApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllPolls': {
					const status = this.getNodeParameter('status', i) as string;
					const teamId = this.getNodeParameter('teamId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams();
					if (status && status !== 'all') queryParams.append('status', status);
					if (teamId) queryParams.append('team_id', teamId);
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/polls?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPoll': {
					const pollId = this.getNodeParameter('pollId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/polls/${pollId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'castVote': {
					const pollId = this.getNodeParameter('pollId', i) as string;
					const option = this.getNodeParameter('option', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;
					const address = this.getNodeParameter('address', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/polls/${pollId}/vote`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							option,
							signature,
							address,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPollResults': {
					const pollId = this.getNodeParameter('pollId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/polls/${pollId}/results`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUserVotes': {
					const address = this.getNodeParameter('address', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams();
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/users/${address}/votes?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createPoll': {
					const title = this.getNodeParameter('title', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const optionsString = this.getNodeParameter('options', i) as string;
					const endTime = this.getNodeParameter('endTime', i) as string;
					const createTeamId = this.getNodeParameter('createTeamId', i) as string;

					const optionsArray = optionsString.split(',').map(opt => opt.trim());

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/polls`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							title,
							description,
							options: optionsArray,
							endTime,
							teamId: createTeamId,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
						itemIndex: i,
					});
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeRewardOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('chilizchainApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllRewards': {
					const teamId = this.getNodeParameter('teamId', i) as string;
					const status = this.getNodeParameter('status', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (teamId) params.append('team_id', teamId);
					if (status) params.append('status', status);
					if (limit) params.append('limit', limit.toString());
					if (offset) params.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/rewards?${params.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getReward': {
					const rewardId = this.getNodeParameter('rewardId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/rewards/${rewardId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'claimReward': {
					const rewardId = this.getNodeParameter('rewardId', i) as string;
					const address = this.getNodeParameter('address', i) as string;
					const signature = this.getNodeParameter('signature', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/rewards/${rewardId}/claim`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							address,
							signature,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUserRewards': {
					const address = this.getNodeParameter('address', i) as string;
					const status = this.getNodeParameter('status', i) as string;

					const params = new URLSearchParams();
					if (status) params.append('status', status);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/users/${address}/rewards?${params.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getRewardCampaigns': {
					const teamId = this.getNodeParameter('teamId', i) as string;
					const active = this.getNodeParameter('active', i) as boolean;

					const params = new URLSearchParams();
					if (teamId) params.append('team_id', teamId);
					if (active !== undefined) params.append('active', active.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/rewards/campaigns?${params.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'distributeRewards': {
					const campaignId = this.getNodeParameter('campaignId', i) as string;
					const recipients = this.getNodeParameter('recipients', i) as any;
					const amounts = this.getNodeParameter('amounts', i) as any;

					const recipientsArray = typeof recipients === 'string' ? JSON.parse(recipients) : recipients;
					const amountsArray = typeof amounts === 'string' ? JSON.parse(amounts) : amounts;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/rewards/distribute`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							campaignId,
							recipients: recipientsArray,
							amounts: amountsArray,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: {
					item: i,
				},
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
					pairedItem: {
						item: i,
					},
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeNftOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('chilizchainApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllNfts': {
					const collectionId = this.getNodeParameter('collectionId', i) as string;
					const owner = this.getNodeParameter('owner', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams();
					if (collectionId) queryParams.append('collection_id', collectionId);
					if (owner) queryParams.append('owner', owner);
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/nfts?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getNft': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const collectionId = this.getNodeParameter('collectionId', i) as string;

					const queryParams = new URLSearchParams();
					if (collectionId) queryParams.append('collection_id', collectionId);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/nfts/${tokenId}?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'mintNft': {
					const to = this.getNodeParameter('to', i) as string;
					const metadata = this.getNodeParameter('metadata', i) as any;
					const collectionId = this.getNodeParameter('collectionId', i) as string;

					const body: any = {
						to,
						metadata: typeof metadata === 'string' ? JSON.parse(metadata) : metadata,
						collection_id: collectionId,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/nfts/mint`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'transferNft': {
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const collectionId = this.getNodeParameter('collectionId', i) as string;

					const body: any = {
						from,
						to,
						tokenId,
						collection_id: collectionId,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/nfts/transfer`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getNftCollections': {
					const teamId = this.getNodeParameter('teamId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const queryParams = new URLSearchParams();
					if (teamId) queryParams.append('team_id', teamId);
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/nfts/collections?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getUserNfts': {
					const address = this.getNodeParameter('address', i) as string;
					const collectionId = this.getNodeParameter('collectionId', i) as string;

					const queryParams = new URLSearchParams();
					if (collectionId) queryParams.append('collection_id', collectionId);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/users/${address}/nfts?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getNftHistory': {
					const tokenId = this.getNodeParameter('tokenId', i) as string;
					const collectionId = this.getNodeParameter('collectionId', i) as string;

					const queryParams = new URLSearchParams();
					queryParams.append('collection_id', collectionId);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/nfts/${tokenId}/history?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeTeamOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('chilizchainApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAllTeams': {
          const sport = this.getNodeParameter('sport', i) as string;
          const league = this.getNodeParameter('league', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          let url = `${credentials.baseUrl}/teams`;
          const queryParams: string[] = [];
          if (sport) queryParams.push(`sport=${encodeURIComponent(sport)}`);
          if (league) queryParams.push(`league=${encodeURIComponent(league)}`);
          if (limit) queryParams.push(`limit=${limit}`);
          if (offset) queryParams.push(`offset=${offset}`);
          if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTeam': {
          const teamId = this.getNodeParameter('teamId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/teams/${teamId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTeamFans': {
          const teamId = this.getNodeParameter('teamId', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          let url = `${credentials.baseUrl}/teams/${teamId}/fans`;
          const queryParams: string[] = [];
          if (limit) queryParams.push(`limit=${limit}`);
          if (offset) queryParams.push(`offset=${offset}`);
          if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTeamEngagement': {
          const teamId = this.getNodeParameter('teamId', i) as string;
          const period = this.getNodeParameter('period', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/teams/${teamId}/engagement?period=${period}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTeamNews': {
          const teamId = this.getNodeParameter('teamId', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          let url = `${credentials.baseUrl}/teams/${teamId}/news`;
          const queryParams: string[] = [];
          if (limit) queryParams.push(`limit=${limit}`);
          if (offset) queryParams.push(`offset=${offset}`);
          if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'followTeam': {
          const teamId = this.getNodeParameter('teamId', i) as string;
          const address = this.getNodeParameter('address', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/teams/${teamId}/follow`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              address,
              signature,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeTransactionOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('chilizchainApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      const baseOptions: any = {
        headers: {
          'Authorization': `Bearer ${credentials.apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'getAllTransactions': {
          const address = this.getNodeParameter('address', i) as string;
          const type = this.getNodeParameter('type', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          const queryParams: any = { limit, offset };
          if (address) queryParams.address = address;
          if (type) queryParams.type = type;

          const queryString = new URLSearchParams(queryParams).toString();

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/transactions?${queryString}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTransaction': {
          const txHash = this.getNodeParameter('txHash', i) as string;

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/transactions/${txHash}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPendingTransactions': {
          const address = this.getNodeParameter('address', i) as string;
          const type = this.getNodeParameter('type', i) as string;

          const queryParams: any = {};
          if (address) queryParams.address = address;
          if (type) queryParams.type = type;

          const queryString = Object.keys(queryParams).length > 0 ? 
            `?${new URLSearchParams(queryParams).toString()}` : '';

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/transactions/pending${queryString}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'broadcastTransaction': {
          const signedTx = this.getNodeParameter('signedTx', i) as string;

          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/transactions/broadcast`,
            body: { signedTx },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlock': {
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/blocks/${blockNumber}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getLatestBlock': {
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/blocks/latest`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
