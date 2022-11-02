import { defineModel, str, num, method, hasOne, hasMany } from '@/corm'
import { Phone } from './Phone'
import { Post } from './Post'

export const User = defineModel(() => {
  const id = num()
  const email = str()
  const firstName = str()
  const lastName = str().nullable()
  const profile = str()

  const phone = () => hasOne(Phone)
  const posts = () => hasMany(Post)

  const fullName = method(['firstName', 'lastName'], () => {
    return `${firstName} ${lastName}`
  })

  const fullNameWithEmail = method([fullName, 'email'], () => {
    return `${fullName()}: ${email}`
  })

  return {
    id,
    email,
    firstName,
    lastName,
    profile,
    phone,
    posts,
    fullName,
    fullNameWithEmail
  }
})

const user = User.make({
  id: 1,
  firstName: 'Jane',
  lastName: 'Doe',
  email: '',
  phone: {
    id: 1,
    number: '123-4567-8910',
    user: {
      id: 1,
      firstName: 'Jane'
    }
  },
  posts: [
    { id: 1, title: 'Title 1', body: 'Body 1' },
    { id: 2, title: 'Title 2', body: 'Body 2' },
    { id: 3, title: 'Title 3', body: 'Body 3' }
  ]
})

user.firstName
user.lastName
user.profile
user.fullName
user.fullNameWithEmail

user.phone.id
user.phone.number
user.phone.user
user.phone.user.id
user.phone.user.firstName
user.phone.format

user.posts.map(post => {
  post.id
  post.title
})
