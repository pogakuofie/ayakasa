import React from 'react'
import styled from 'styled-components'

// components
import Phone from '../components/phone'

// hooks
import { useAuth } from '../hooks'

const Phoneholder = () => {
  const { authContext } = useAuth()

  const { currentUser, mobileToSignIn } = authContext

  return (
    <MainHolder currentUser={currentUser} mobileToSignIn={mobileToSignIn}>
      <BodyOne>
        <BodyTwo>
          <PhoneBackground>
            <Phone />
          </PhoneBackground>
        </BodyTwo>
      </BodyOne>
    </MainHolder>
  )
}

export default Phoneholder

const MainHolder = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: ${({ currentUser, mobileToSignIn }) =>
      currentUser || mobileToSignIn ? 'grid' : 'none'};
    height: 100vh;
  }
`

const BodyOne = styled.div`
  display: grid;
  height: 710px;
  width: 360px;
  background-color: #626368;
  border-radius: 30px;
  @media (max-width: 768px) {
    background-color: transparent;
    width: 100vw;
    height: 100vh;
  }
`

const BodyTwo = styled.div`
  height: 700px;
  width: 350px;
  border-radius: 30px;
  padding: 5px;
  align-self: center;
  justify-self: center;
  @media (max-width: 768px) {
    height: 100vh;
    width: 100vw;
    padding: 0px;
  }
`

const PhoneBackground = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-color: white;
  @media (max-width: 768px) {
    background-color: transparent;
    height: 100vh;
    width: 100vw;
  }
`
