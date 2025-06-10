export interface PermissionStatus {
  microphone: 'granted' | 'denied' | 'prompt';
}

export class PermissionManager {
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPermissionStatus(): Promise<PermissionStatus> {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return {
        microphone: result.state as 'granted' | 'denied' | 'prompt',
      };
    } catch (error) {
      return {
        microphone: 'prompt',
      };
    }
  }
} 