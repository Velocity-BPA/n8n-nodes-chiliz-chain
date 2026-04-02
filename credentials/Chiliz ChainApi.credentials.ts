import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ChilizChainApi implements ICredentialType {
	name = 'chilizChainApi';
	displayName = 'Chiliz Chain API';
	documentationUrl = 'https://docs.chiliz.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The API key for accessing Chiliz Chain API. Get your API key from the Chiliz developer portal.',
			required: true,
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.chiliz.com/api/v1',
			description: 'The base URL for Chiliz Chain API',
			required: true,
		},
	];
}