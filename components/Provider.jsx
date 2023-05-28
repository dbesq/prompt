'use client'

import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
	//	HIGHER ORDER FUNCTION, WRAP OTHER STUFF IN THE COMPONENT
	return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
