import React from 'react';
import { ElementType } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'

type PrivateRouteProps = {
	component: ElementType
	path: string
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
	const isAuthenticated = localStorage.getItem("isLoggedIn")

	return (
		<Route
			path={path}
			render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	)
}

export { PrivateRoute }