import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

import { theme } from 'src/theme'

export default NextAuth({
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      console.log({ user, account, profile, email, credentials })
      return true
    },
  },
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
  ],
  theme: {
    colorScheme: 'dark',
    brandColor: theme.palette.primary.main,
    logo: '../../../../public/lexico_logo.svg',
  },
})
