import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { FormLabel, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from '@standardcreative/client-core/src/store'
import { Config, validateEmail, validatePhoneNumber } from '@standardcreative/common/src/config'
import * as polyfill from 'credential-handler-polyfill'
import styles from './AdminLogin.module.scss'
import { useTranslation } from 'react-i18next'
import { useAuthState } from '@standardcreative/client-core/src/user/state/AuthState'
import { AuthService } from '@standardcreative/client-core/src/user/state/AuthService'
import { login } from '../../services/api'
import { useHistory } from "react-router-dom";

interface Props {
	changeActiveMenu?: any
	setProfileMenuOpen?: any
	classes?: any

	hideLogin?: any
}

const AdminLogin = (props: Props): any => {
	let history = useHistory();
	const { changeActiveMenu, setProfileMenuOpen, hideLogin } = props
	const { t } = useTranslation()

	const dispatch = useDispatch()
	const selfUser = useAuthState().user

	const [username, setUsername] = useState(selfUser?.name.value)
	const [emailPhone, setEmailPhone] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [errorUsername, setErrorUsername] = useState(false)
	const { classes } = props

	const handleInputEmailChange = (e: any) => setEmailPhone(e.target.value)
	const handleInputPasswordChange = (e: any) => setPassword(e.target.value)

	const validate = () => {
		if (!validateEmail()) {
			setError('Email is invalid')
			return false
		}
		if (emailPhone === '') {
			setError('Please input Email')
			return false
		}
		return true
	}
	function validateEmail() {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(emailPhone).toLowerCase());
	}

	const handleSubmit = async () => {
		if (!validate()) return
		const result = await login(emailPhone, password)
		if (result) {
			localStorage.setItem("isLoggedIn", 'loggedin')
			localStorage.setItem("id", result.data.id)
			localStorage.setItem("email", result.data.email)
			localStorage.setItem("accessToken", result.data.accessToken)
			localStorage.setItem("refreshToken", result.data.refreshToken)
			history.push('/auctions');
		} else {
			const errmsg = result ? result.error.message : 'Something went wrong, Please try again later'
			setError(errmsg)
		}
		return
	}
	// useEffect(() => {
	// 	if (localStorage.getItem("accessToken")) {
	// 		history.push('/auctions');
	// 	}
	// })

	return (
		<div className={styles.container}>
			<Grid container className={styles.gridContainer}>
				<Grid item>
					<form onSubmit={handleSubmit} style={{ display: 'grid' }}>
						<TextField
							className={styles.emailField}
							size="small"
							placeholder="Email"
							variant="outlined"
							onChange={handleInputEmailChange}
							onBlur={validate}
						/>
						<TextField
							className={styles.passwordField}
							type="password"
							size="small"
							placeholder="Password"
							variant="outlined"
							onChange={handleInputPasswordChange}
							onBlur={validate}
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

export default AdminLogin
