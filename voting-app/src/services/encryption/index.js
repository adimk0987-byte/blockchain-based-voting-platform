import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'fallback-key-change-in-production'

export const encryptionService = {
  encryptBallot(ballotData, publicKey) {
    const ballotString = JSON.stringify(ballotData)
    return CryptoJS.AES.encrypt(ballotString, ENCRYPTION_KEY).toString()
  },

  decryptBallot(encryptedData, privateKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString)
  },

  generateHash(data) {
    return CryptoJS.SHA256(JSON.stringify(data)).toString()
  },

  generateReceipt() {
    return 'RCPT_' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }
}

export default encryptionService
