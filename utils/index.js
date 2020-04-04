import { name, version, author } from '../package.json'
const ENV = process.env

export function isDev() {
  return !ENV || !ENV.NODE_ENV || ENV.NODE_ENV === 'development'
}

export function isWatch() {
  return ENV && ENV.WATCH === 'development'
}

export function getFormat() {
  return ENV.FORMAT || 'UMD'
}

export function getBanner() {
  return `/**\r\n* name: ${name},\r\n* version: ${version},\r\n* author: ${author}\r\n*/`
}
