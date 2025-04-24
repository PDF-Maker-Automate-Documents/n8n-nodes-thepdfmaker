import { INodeType, INodeTypeDescription, ILoadOptionsFunctions } from 'n8n-workflow';
import { BASE_URL } from './constants';

export class ThePDFMakerGeneratePDF implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'The PDF Maker Generate PDF',
		name: 'ThePDFMakerGeneratePDF',
		icon: 'file:thepdfmaker.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["templateActions"] + ": " + $parameter["resource"]}}',
		description: 'Generate PDF from data source',
		defaults: {
			name: 'The PDF Maker Generate PDF',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'thePDFMakerGeneratePDFApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Template',
						value: 'template',
					},
				],
				default: 'template',
			},
			{
				displayName: 'Template Name or ID',
				name: 'templateId',
				type: 'options',
				description:
					'Choose a template to generate a PDF. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				required: true,
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['template'],
					},
				},
				typeOptions: {
					loadOptionsMethod: 'getTemplates',
				},
				routing: {
					request: {
						method: 'POST',
						url: '=/api/n8n/generate-pdf',
						body: {
							templateId: '={{$value}}',
							data: '={{$json}}',
						},
					},
				},
				default: '',
			},
		],
	};

	methods = {
		loadOptions: {
			async getTemplates(this: ILoadOptionsFunctions) {
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'thePDFMakerGeneratePDFApi',
					{
						url: `${BASE_URL}api/n8n/get-template-options`,
						method: 'GET',
					},
				);

				const templates = Array.isArray(response) ? response : response.data;

				return templates.map((template: { value: string; name: string }) => ({
					name: template?.name,
					value: template?.value,
				}));
				// return [
				// 	{ name: 'test', value: 'test' },
				// 	{ name: 'test2', value: 'test2' },
				// ];
			},
		},
	};
}
