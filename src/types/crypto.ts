export interface EncryptionParams {
  algorithm: string;
  keySize: number;
  mode: string;
}

export interface EncryptedData {
  ciphertext: string;
  iv: string;
  salt: string;
}

export interface DecryptionResult {
  plaintext: string;
  success: boolean;
  error?: string;
}