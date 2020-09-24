import React from 'react'
import styled from 'styled-components'
import { withTranslation, Trans, useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

// compoonents
import {
  HeadMSG,
  ActionButton,
  NumberBox,
  NumberInput,
  TextArea,
  Description,
} from '../common'

// context
import {
  useSMS,
  // useAuth
} from '../../hooks'

const Home = ({ primaryFont, countryCode, setCountryCode }) => {
  const { t } = useTranslation()
  const { smsContext } = useSMS()

  const {
    recipientNumber,
    setRecipientNumber,
    recipientNumValid,
    validateRecipientPhoneNumber,
    setSMSBody,
    hasValidBody,
    validateBody,
    isLoading,
    smsBody,
  } = smsContext

  return (
    <InnerHolderVerify>
      <HeadMSG font={primaryFont}>
        <Trans>compose_msg</Trans>
      </HeadMSG>

      <NumberBox>
        <NumberInput
          size={4}
          maxLength={4}
          contentEditable={false}
          type="text"
          value={countryCode}
          margin="15px 0px 15px 15px"
          font={primaryFont}
          onChange={() => {
            setCountryCode('+233')
          }}
        />
        <NumberInput
          maxLength={10}
          size={10}
          hasError={!recipientNumValid}
          type="text"
          font={primaryFont}
          value={recipientNumber}
          placeholder={t('recipient')}
          onChange={(e) => {
            const number = e.target.value.replace(/[^0-9]/g, '')
            setRecipientNumber(number)
          }}
        />
      </NumberBox>

      <TextArea
        hasError={!hasValidBody}
        font={primaryFont}
        value={smsBody}
        maxLength={110}
        onChange={({ currentTarget }) => {
          setSMSBody(currentTarget.value)
        }}
      />

      <Description font={primaryFont}>
        <Trans>txt_message</Trans>
      </Description>

      <ActionButton
        id="sign-in-button"
        font={primaryFont}
        onClick={() => {
          validateBody()
          validateRecipientPhoneNumber()
          // if (false) signOut()
        }}
        disabled={isLoading}
      >
        {isLoading ? t('sending') : t('send')}
      </ActionButton>
    </InnerHolderVerify>
  )
}

Home.propTypes = {
  primaryFont: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  setCountryCode: PropTypes.func.isRequired,
}

export default withTranslation()(Home)

const InnerHolderVerify = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
`
