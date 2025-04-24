import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';
import { DASHBOARD_URL } from '../nodes/ThePDFMaker/constants';

export class thePDFMakerGeneratePDFApi implements ICredentialType {
	name = 'thePDFMakerGeneratePDFApi';
	displayName = 'The PDF Maker Generate PDF API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = `${DASHBOARD_URL}settings`;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
