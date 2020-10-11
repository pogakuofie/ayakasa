import React from 'react'
import { withTranslation, Trans } from 'react-i18next'
import styled from 'styled-components'

// compoonents
import { Description, ActionButton, Logo, Box } from '../../components/common'

// hooks
import { useAuth } from '../../hooks'

// assets
const LogoImage = require('../../assets/images/logo.png')

const Dashboard = () => {
  const { authContext } = useAuth()

  const { currentUser, mobileToSignIn, setMobileToSignIn } = authContext

  return (
    <MainHolder currentUser={currentUser} mobileToSignIn={mobileToSignIn}>
      <MobileHolder>
        <Logo alt="Logo" src={LogoImage} />
      </MobileHolder>

      <Box>
        <Description size={30} lineHeight={50}>
          <Trans>welcome_message</Trans>
        </Description>
        <Description size={15} lineHeight={25}>
          <Trans>welcome_sub_message</Trans>
        </Description>
      </Box>

      <MobileHolder>
        <ActionButton
          onClick={() => {
            setMobileToSignIn(true)
          }}
        >
          <Trans>sign_in</Trans>
        </ActionButton>
      </MobileHolder>
    </MainHolder>
  )
}

export default withTranslation()(Dashboard)

const MainHolder = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  @media (max-width: 768px) {
    display: ${({ currentUser, mobileToSignIn }) => {
      return currentUser || mobileToSignIn ? 'none' : 'grid'
    }};
    grid-auto-flow: rows;
  }
`

const MobileHolder = styled.div`
  display: none;
  align-items: center;
  justify-items: center;
  margin: 0;
  @media (max-width: 768px) {
    display: grid;
  }
`
