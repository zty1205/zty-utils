import { name, version, author, repository } from '../package.json'
const ENV = process.env

export function isDev() {
  console.log('env = ', ENV)
  return !ENV || !ENV.NODE_ENV || ENV.NODE_ENV === 'development'
}

export function isWatch() {
  return ENV && ENV.WATCH === 'true'
}

export function getFormat() {
  console.log('version = ', version)
  return ENV.FORMAT || 'UMD'
}

export function getBanner() {
  return `/**\r\n* name: ${name},\r\n* version: ${version},\r\n* author: ${author}\r\n*/`
}

export function getFooter() {
  return `// welcome to star my repository: ${repository.url}`
}