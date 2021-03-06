import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

//  Components
import Phoneholder from '../containers/Phoneholder'
import { Dashboard } from '../containers/dashboard'

const Home = () => (
  <MainHolder>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Ayakasa - Consumer Engagement, Success &amp; Marketing, Analytics, Bulk SMS
      </title>
      <link rel="canonical" href="http://ayakasa.com/about" />
    </Helmet>
    <InnerHolder>
      <Dashboard />
      <Phoneholder />
    </InnerHolder>
  </MainHolder>
)

export default Home

const MainHolder = styled.div`
  display: grid;
  @media (max-width: 768px) {
    height: 100vh;
  }
`

const InnerHolder = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 3fr 2fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: 100vh;
  }
`
