// SET UP AUTH PROVIDERS

import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDb } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		// Keep track of session to know which user is online
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email })

			session.user.id = sessionUser._id.toString()

			return session
		},

		// Sign in or automatically create a new user in the database
		async signIn({ profile }) {
			try {
				// serverless => Lanbda => dynamic db
				await connectToDb()

				// 1.  Check if user already exists
				const userExists = await User.findOne({ email: profile.email })

				// 2.  If not user, create new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture
					})
				}
				return true
			} catch (error) {
				console.log('Sign in error: ', error)
				return false
			}
		}
	}	
})

export { handler as GET, handler as POST }
