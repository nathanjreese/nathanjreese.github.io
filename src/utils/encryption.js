import crypto from 'crypto'

const keyText = import.meta.env.VITE_ENCRYPT_KEY
const ivText = import.meta.env.VITE_ENCRYPT_IV

export function encryptSymmetric(plainText) {
    const key = Buffer.from(keyText, 'base64')
    const iv = Buffer.from(ivText, 'base64')

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

export function decryptSymmetric(encText) {
    const key = Buffer.from(keyText, 'base64')
    const iv = Buffer.from(ivText, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}