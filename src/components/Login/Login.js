import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef
} from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../context/auth-context'
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') }
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') }
	}
	return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 }
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 }
	}
	return { value: '', isValid: false }
}
const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState('')
	// const [emailIsValid, setEmailIsValid] = useState()
	// const [enteredPassword, setEnteredPassword] = useState('')
	// const [passwordIsValid, setPasswordIsValid] = useState()
	const [formIsValid, setFormIsValid] = useState(false)

	/* OK */
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null
	})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null
	})

	// useEffect(() => {
	// 	console.log('EFFECT RUNNING')

	// 	return () => {
	// 		console.log('EFFECT CLEAN UP')
	// 	}
	// }, [])

	const authContext = useContext(AuthContext)
	const emailInputRef = useRef()
	const passwordInputRef = useRef()

	const { isValid: emailIsValid } = emailState
	const { isValid: passwordIsValid } = passwordState
	/* OK */
	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Check form validity')
			setFormIsValid(emailIsValid && passwordIsValid)
		}, 2000)

		return () => {
			clearTimeout(identifier)
			console.log('CLEAN UP')
		}
	}, [emailIsValid, passwordIsValid])

	/* OK */
	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

		// setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
	}

	/* OK */
	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' })
	}

	const submitHandler = (event) => {
		event.preventDefault()
		if (formIsValid) {
			authContext.onLogin(emailState.value, passwordState.value)
		} else if (!emailIsValid) {
			emailInputRef.current.focus()
		} else {
			passwordInputRef.current.focus()
		}
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					type='email'
					id='email'
					isValid={emailIsValid}
					label='Email'
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					type='password'
					id='password'
					isValid={passwordIsValid}
					label='Password'
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
