import { defineModel, str, num, method, hasOne } from '@/corm'
import { User } from './User'

export const Phone = defineModel(() => {
  const id = num()
  const number = str()

  const user = () => hasOne(User)

  const format = method(['number'], () => {
    return 'formatted'
  })

  return {
    id,
    number,
    user,
    format
  }
})
