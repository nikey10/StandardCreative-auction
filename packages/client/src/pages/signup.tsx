import { EmptyLayout } from '@standardcreative/client-core/src/common/components/Layout/EmptyLayout'
import { AuthService } from '@standardcreative/client-core/src/user/state/AuthService'
import React, { useEffect } from 'react'
import { useDispatch } from '@standardcreative/client-core/src/store'

import { useTranslation } from 'react-i18next'
import SignUp from '../components/SignUp'

interface Props { }

export const IndexPage = (props: Props): any => {
	//const { doLoginAuto } = props
	const dispatch = useDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		AuthService.doLoginAuto(true)
	}, [])

	// <Button className="right-bottom" variant="contained" color="secondary" aria-label="scene" onClick={(e) => { setSceneVisible(!sceneIsVisible); e.currentTarget.blur(); }}>scene</Button>

	return (
		<EmptyLayout pageTitle={t('login.pageTitle')}>
			<SignUp />
		</EmptyLayout>
	)
}

export default IndexPage
