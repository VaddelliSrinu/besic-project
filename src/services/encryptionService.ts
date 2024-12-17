import { EncryptionParams, EncryptedData, DecryptionResult } from '../types/crypto';
import { generateIV, generateSalt, arrayBufferToBase64, base64ToArrayBuffer } from '../utils/crypto';

export class EncryptionService {
  private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(text: string, password: string): Promise<EncryptedData> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const salt = generateSalt();
      const iv = generateIV();
      const key = await this.deriveKey(password, salt);

      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      );

      return {
        ciphertext: arrayBufferToBase64(encrypted),
        iv: arrayBufferToBase64(iv),
        salt: arrayBufferToBase64(salt)
      };
    } catch (error) {
      throw new Error('Encryption failed: ' + error.message);
    }
  }

  async decrypt(encryptedData: EncryptedData, password: string): Promise<DecryptionResult> {
    try {
      const salt = base64ToArrayBuffer(encryptedData.salt);
      const iv = base64ToArrayBuffer(encryptedData.iv);
      const ciphertext = base64ToArrayBuffer(encryptedData.ciphertext);
      
      const key = await this.deriveKey(password, new Uint8Array(salt));
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        ciphertext
      );

      const decoder = new TextDecoder();
      return {
        plaintext: decoder.decode(decrypted),
        success: true
      };
    } catch (error) {
      return {
        plaintext: '',
        success: false,
        error: 'Decryption failed: ' + error.message
      };
    }
  }
}