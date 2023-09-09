import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto')

@Injectable()
export class AuthService {
  vkParams(query: Record<string, string>, secretKey: string): boolean {
    let sign = ''
    const queryParams = []
    const processQueryParam = (key, value) => {
      if (typeof value === 'string') {
        if (key === 'sign') {
          sign = value
        } else if (key.startsWith('vk_')) {
          queryParams.push({ key, value })
        }
      }
    }

    for (const key of Object.keys(query)) {
      const value = query[key]
      processQueryParam(key, value)
    }

    if (!sign || queryParams.length === 0) {
      return false
    }

    const queryString = queryParams
      // Сортируем ключи в порядке возрастания.
      .sort((a, b) => a.key.localeCompare(b.key))
      // Воссоздаём новый запрос в виде строки.
      .reduce((acc, { key, value }, idx) => {
        return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`
      }, '')

    const paramsHash = crypto
      .createHmac('sha256', secretKey)
      .update(queryString)
      .digest()
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=$/, '')

    return paramsHash === sign
  }
}
