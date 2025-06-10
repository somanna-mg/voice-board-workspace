import { httpClient } from '../httpClient';

export interface CommandRequest {
  command: string;
  payload?: any;
}

export interface CommandResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class CommandRouterClient {
  async sendCommand(request: CommandRequest): Promise<CommandResponse> {
    try {
      const response = await httpClient.post('/api/commands', request);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
} 