import { defineModel, str, num, method, hasOne } from '@/corm'
import { User } from './User'

export const Post = defineModel(() => {
  const id = num()
  const title = str()
  const body = str()

  const user = () => hasOne(User)

  const parse = method(['body'], () => {
    return 'parsed'
  })

  return {
    id,
    title,
    body,
    user,
    parse
  }
})
