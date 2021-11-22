import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { FormLabel, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from '@standardcreative/client-core/src/store'
import { Config, validateEmail, validatePhoneNumber } from '@standardcreative/common/src/config'
import * as polyfill from 'credential-handler-polyfill'
import styles from './SignUp.module.scss'
import { useTranslation } from 'react-i18next'
import { useAuthState } from '@standardcreative/client-core/src/user/state/AuthState'
import { AuthService } from '@standardcreative/client-core/src/user/state/AuthService'
import { signup } from '../../services/api'
import { useHistory } from 'react-router-dom'

interface Props {
	changeActiveMenu?: any
	setProfileMenuOpen?: any
	classes?: any

	hideLogin?: any
}

const SignUp = (props: Props): any => {
	let history = useHistory();
	const { changeActiveMenu, setProfileMenuOpen, hideLogin } = props
	const { t } = useTranslation()

	const dispatch = useDispatch()
	const selfUser = useAuthState().user

	const [username, setUsername] = useState(selfUser?.name.value)
	const [emailPhone, setEmailPhone] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [errorUsername, setErrorUsername] = useState(false)
	const { classes } = props

	useEffect(() => {
		selfUser && setUsername(selfUser.name.value)
	}, [selfUser.name.value])

	const handleInputEmailChange = (e: any) => setEmailPhone(e.target.value)
	const handleInputPasswordChange = (e: any) => setPassword(e.target.value)
	const handleInputConfirmPasswordChange = (e: any) => setConfirmPassword(e.target.value)

	const validate = () => {
		if (!validateEmail()) {
			setError('Email is invalid')
			return false
		}
		if (emailPhone === '') {
			setError('Please input Email')
			return false
		}
		if (password != confirmPassword) {
			setError('Password is not matched. please re-type again')
			return false
		}
		if (password == '') {
			setError('Please set password')
			return false
		}
		return true
	}
	function validateEmail() {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(re.test(String(emailPhone).toLowerCase()))
		return re.test(String(emailPhone).toLowerCase());
	}
	const handleSubmit = () => {
		if (!validate()) return
		signup(emailPhone, password)
		history.push('/login')
	}

	return (
		<div className={styles.container}>
			<Grid container className={styles.gridContainer}>
				<Grid item>
					<form onSubmit={() => handleSubmit} style={{ display: 'grid' }}>
						<TextField
							className={styles.emailField}
							size="small"
							placeholder="Email"
							variant="outlined"
							onChange={handleInputEmailChange}
						// onBlur={validate}
						/>
						<TextField
							className={styles.passwordField}
							type="password"
							size="small"
							placeholder="Password"
							variant="outlined"
							onChange={handleInputPasswordChange}
						// onBlur={validate}
						/>
						<TextField
							className={styles.passwordField}
							type="password"
							size="small"
							placeholder="Confirm Password"
							variant="outlined"
							onChange={handleInputConfirmPasswordChange}
						// onBlur={validate}
						/>
						<FormLabel className={styles.errorLabel}>{error}</FormLabel>
						<Button className={styles.sendButton} onClick={() => handleSubmit()}>
							Login
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	)
}

export default SignUp
