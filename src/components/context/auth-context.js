import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {}
})

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const storedUserLoggedInfo = localStorage.getItem('isLoggedIn')
		if (storedUserLoggedInfo) {
			setIsLoggedIn(storedUserLoggedInfo)
		}
	}, [])

	const logoutHandler = () => {
		const isLoggedIn = false
		localStorage.setItem('isLoggedIn', isLoggedIn)
		setIsLoggedIn(isLoggedIn)
	}

	const loginHandler = () => {
		const isLoggedIn = true
		localStorage.setItem('isLoggedIn', isLoggedIn)
		setIsLoggedIn(isLoggedIn)
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
export default AuthContext
