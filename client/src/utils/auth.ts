import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async () => {
        let user = null
        if (!user) {
          throw new Error("User not found.")
        }
        return user
      },
    }),
  ],
})