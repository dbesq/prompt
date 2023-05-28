// Connect to database
// Used in api/auth/[...nextauth]/route.js

import mongoose from 'mongoose'

let isConnected = false // track db connection

export const connectToDb = async () => {
	if (isConnected) {
		console.log('Already connected to MongoDB')
		return
	}

	try {
		mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		isConnected = true
		console.log('Connected to MongoDB')
	} catch (error) {
		console.log('Connection error: ', error)
	}
}
