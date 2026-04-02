/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ChilizChain } from '../nodes/Chiliz Chain/Chiliz Chain.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('ChilizChain Node', () => {
  let node: ChilizChain;

  beforeAll(() => {
    node = new ChilizChain();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Chiliz Chain');
      expect(node.description.name).toBe('chilizchain');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('FanToken Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.chiliz.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getAllTokens', () => {
		it('should retrieve all fan tokens successfully', async () => {
			const mockResponse = { tokens: [{ id: '1', name: 'Test Token' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllTokens')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce('');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFanTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle errors when retrieving tokens', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllTokens');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeFanTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getToken', () => {
		it('should retrieve specific token details successfully', async () => {
			const mockResponse = { id: '1', name: 'Test Token' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getToken')
				.mockReturnValueOnce('token123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFanTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('transferToken', () => {
		it('should transfer tokens successfully', async () => {
			const mockResponse = { transactionHash: '0x123', success: true };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('transferToken')
				.mockReturnValueOnce('token123')
				.mockReturnValueOnce('0xfrom')
				.mockReturnValueOnce('0xto')
				.mockReturnValueOnce('100');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFanTokenOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle transfer errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('transferToken');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Insufficient balance'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(false);

			await expect(executeFanTokenOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Insufficient balance');
		});
	});
});

describe('Voting Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ 
				apiKey: 'test-key', 
				baseUrl: 'https://api.chiliz.com/api/v1' 
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: { 
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn() 
			},
		};
	});

	describe('getAllPolls', () => {
		it('should retrieve all polls successfully', async () => {
			const mockResponse = { polls: [{ id: '1', title: 'Test Poll' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllPolls')
				.mockReturnValueOnce('active')
				.mockReturnValueOnce('team123')
				.mockReturnValueOnce(10)
				.mockReturnValueOnce(0);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle getAllPolls error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllPolls');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('getPoll', () => {
		it('should get specific poll successfully', async () => {
			const mockResponse = { id: '1', title: 'Test Poll' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPoll')
				.mockReturnValueOnce('poll123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('castVote', () => {
		it('should cast vote successfully', async () => {
			const mockResponse = { success: true, voteId: 'vote123' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('castVote')
				.mockReturnValueOnce('poll123')
				.mockReturnValueOnce('option1')
				.mockReturnValueOnce('signature123')
				.mockReturnValueOnce('0x123address');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getPollResults', () => {
		it('should get poll results successfully', async () => {
			const mockResponse = { results: { option1: 100, option2: 50 } };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getPollResults')
				.mockReturnValueOnce('poll123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getUserVotes', () => {
		it('should get user votes successfully', async () => {
			const mockResponse = { votes: [{ pollId: '1', option: 'option1' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getUserVotes')
				.mockReturnValueOnce('0x123address')
				.mockReturnValueOnce(10)
				.mockReturnValueOnce(0);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('createPoll', () => {
		it('should create poll successfully', async () => {
			const mockResponse = { id: 'poll123', title: 'New Poll' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createPoll')
				.mockReturnValueOnce('New Poll')
				.mockReturnValueOnce('Poll description')
				.mockReturnValueOnce('option1,option2,option3')
				.mockReturnValueOnce('2024-12-31T23:59:59Z')
				.mockReturnValueOnce('team123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeVotingOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Reward Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.chiliz.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getAllRewards', () => {
		it('should get all rewards successfully', async () => {
			const mockRewards = [{ id: 'reward1', type: 'token', amount: 100 }];
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAllRewards')
				.mockReturnValueOnce('team1')
				.mockReturnValueOnce('active')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockRewards);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockRewards, pairedItem: { item: 0 } }]);
		});

		it('should handle errors when getting all rewards fails', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllRewards');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('claimReward', () => {
		it('should claim reward successfully', async () => {
			const mockClaimResult = { success: true, transactionId: 'tx123' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('claimReward')
				.mockReturnValueOnce('reward1')
				.mockReturnValueOnce('0x123...456')
				.mockReturnValueOnce('signature123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockClaimResult);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockClaimResult, pairedItem: { item: 0 } }]);
		});

		it('should handle errors when claiming reward fails', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('claimReward');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Claim failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Claim failed' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('distributeRewards', () => {
		it('should distribute rewards successfully', async () => {
			const mockDistributionResult = { success: true, distributed: 5 };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('distributeRewards')
				.mockReturnValueOnce('campaign1')
				.mockReturnValueOnce(['0x123...456', '0x789...abc'])
				.mockReturnValueOnce([100, 200]);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockDistributionResult);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockDistributionResult, pairedItem: { item: 0 } }]);
		});

		it('should handle errors when distributing rewards fails', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('distributeRewards');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Distribution failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeRewardOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Distribution failed' }, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Nft Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.chiliz.com/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Chiliz Chain Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('getAllNfts operation', () => {
		it('should successfully get all NFTs', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getAllNfts';
					case 'collectionId': return 'collection-123';
					case 'limit': return 10;
					default: return undefined;
				}
			});

			const mockResponse = { nfts: [{ id: '1', name: 'Test NFT' }] };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeNftOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'GET',
					url: expect.stringContaining('/nfts'),
				})
			);
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle getAllNfts errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'getAllNfts';
				return undefined;
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(executeNftOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
		});
	});

	describe('mintNft operation', () => {
		it('should successfully mint NFT', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'mintNft';
					case 'to': return '0x123...';
					case 'metadata': return { name: 'Test NFT' };
					case 'collectionId': return 'collection-123';
					default: return undefined;
				}
			});

			const mockResponse = { success: true, tokenId: '456' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeNftOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'POST',
					url: expect.stringContaining('/nfts/mint'),
				})
			);
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle mintNft errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				if (param === 'operation') return 'mintNft';
				return 'test-value';
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Mint failed'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeNftOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: { error: 'Mint failed' }, pairedItem: { item: 0 } }]);
		});
	});

	describe('transferNft operation', () => {
		it('should successfully transfer NFT', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'transferNft';
					case 'from': return '0x123...';
					case 'to': return '0x456...';
					case 'tokenId': return '789';
					case 'collectionId': return 'collection-123';
					default: return undefined;
				}
			});

			const mockResponse = { success: true, transactionHash: '0xabc...' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeNftOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'POST',
					url: expect.stringContaining('/nfts/transfer'),
				})
			);
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('getUserNfts operation', () => {
		it('should successfully get user NFTs', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getUserNfts';
					case 'address': return '0x123...';
					default: return undefined;
				}
			});

			const mockResponse = { nfts: [{ id: '1', owner: '0x123...' }] };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeNftOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
				expect.objectContaining({
					method: 'GET',
					url: expect.stringContaining('/users/0x123.../nfts'),
				})
			);
			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});
});

describe('Team Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://api.chiliz.com/api/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get all teams successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAllTeams')
      .mockReturnValueOnce('football')
      .mockReturnValueOnce('premier')
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(0);

    const mockResponse = { teams: [{ id: 'team1', name: 'Test Team' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeTeamOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.chiliz.com/api/v1/teams?sport=football&league=premier&limit=10&offset=0',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get specific team successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getTeam')
      .mockReturnValueOnce('team123');

    const mockResponse = { id: 'team123', name: 'Manchester United' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeTeamOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
  });

  it('should follow team successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('followTeam')
      .mockReturnValueOnce('team123')
      .mockReturnValueOnce('0x123...')
      .mockReturnValueOnce('0xsignature...');

    const mockResponse = { success: true, message: 'Team followed successfully' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeTeamOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 },
    }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.chiliz.com/api/v1/teams/team123/follow',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: {
        address: '0x123...',
        signature: '0xsignature...',
      },
      json: true,
    });
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTeam');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeTeamOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'API Error' },
      pairedItem: { item: 0 },
    }]);
  });

  it('should throw error for unknown operation', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

    await expect(
      executeTeamOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Unknown operation: unknownOperation');
  });
});

describe('Transaction Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.chiliz.com/api/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getAllTransactions', () => {
    it('should get all transactions successfully', async () => {
      const mockResponse = { 
        transactions: [{ hash: '0x123', amount: '100' }],
        total: 1
      };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getAllTransactions')
        .mockReturnValueOnce('0xabc123')
        .mockReturnValueOnce('transfer')
        .mockReturnValueOnce(20)
        .mockReturnValueOnce(0);
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.chiliz.com/api/v1/transactions?limit=20&offset=0&address=0xabc123&type=transfer',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });

    it('should handle getAllTransactions errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllTransactions');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const items = [{ json: {} }];
      const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getTransaction', () => {
    it('should get transaction details successfully', async () => {
      const mockResponse = { hash: '0x123', status: 'confirmed', amount: '100' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransaction')
        .mockReturnValueOnce('0x123abc');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.chiliz.com/api/v1/transactions/0x123abc',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });

  describe('broadcastTransaction', () => {
    it('should broadcast transaction successfully', async () => {
      const mockResponse = { txHash: '0x123', status: 'pending' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('broadcastTransaction')
        .mockReturnValueOnce('0xsignedtxdata');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.chiliz.com/api/v1/transactions/broadcast',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        body: { signedTx: '0xsignedtxdata' },
        json: true,
      });
    });
  });

  describe('getLatestBlock', () => {
    it('should get latest block successfully', async () => {
      const mockResponse = { number: 12345, hash: '0xblock123', timestamp: 1640995200 };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getLatestBlock');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const items = [{ json: {} }];
      const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.chiliz.com/api/v1/blocks/latest',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
  });
});
});
