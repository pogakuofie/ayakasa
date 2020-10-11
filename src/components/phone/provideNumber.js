import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { withTranslation, Trans } from 'react-i18next'
import PropTypes from 'prop-types'

// compoonents
import {
  HeadMSG,
  ActionButton,
  Description,
  NumberInput,
  NumberBox,
  Note,
} from '../common'

const ProvideNumber = ({
  validatePhoneNumber,
  phoneNumValid,
  setPhoneNumber,
  phoneNumber,
  setTermsAgreed,
  countryCode,
  setCountryCode,
  recaptchaLoading,
}) => {
  const termsCheckBox = useRef()

  const [termsAgreedLoacal, setTermsAgreedLoacal] = useState(true)

  return (
    <InnerHolderNumber>
      <HeadMSG>
        <Trans>provide_number_head_msg</Trans>
      </HeadMSG>
      <NumberBox>
        <NumberInput
          size={4}
          maxLength={4}
          contentEditable={false}
          type="text"
          value={countryCode}
          margin="15px 0px 15px 15px"
          onChange={() => {
            setCountryCode('+233')
          }}
        />
        <NumberInput
          maxLength={10}
          size={10}
          hasError={!phoneNumValid}
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            const number = e.target.value.replace(/[^0-9]/g, '')
            setPhoneNumber(number)
          }}
        />
      </NumberBox>
      <Description>
        <Trans>provide_number_description</Trans>
      </Description>
      <RecaptchaHolder id="recaptcha-container" />
      <ActionButton
        id="send-code"
        onClick={() => {
          validatePhoneNumber()
          if (!termsCheckBox.current.checked) setTermsAgreedLoacal(false)
        }}
        disabled={recaptchaLoading}
      >
        <Trans>next</Trans>
      </ActionButton>
      <PrivacyHolder>
        <Note htmlFor="terms" color={termsAgreedLoacal ? 'black' : 'red'}>
          <Trans>privacy_policy</Trans>
        </Note>
        <AgreeCheck
          type="checkbox"
          id="terms"
          ref={termsCheckBox}
          onChange={(e) => {
            setTermsAgreed(e.target.checked)
            setTermsAgreedLoacal(e.target.checked)
          }}
        />
      </PrivacyHolder>
    </InnerHolderNumber>
  )
}

const RecaptchaHolder = styled.div`
  margin: 15px;
  justify-self: center;
  @media (max-width: 768px) {
    width: 84vw;
  }
`

const PrivacyHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: 0px 20px 30px 20px;
`

const AgreeCheck = styled.input``

const InnerHolderNumber = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
`

ProvideNumber.defaultProps = { phoneNumValid: true, recaptchaLoading: false }

export default withTranslation()(ProvideNumber)

ProvideNumber.propTypes = {
  setPhoneNumber: PropTypes.func.isRequired,
  validatePhoneNumber: PropTypes.func.isRequired,
  setTermsAgreed: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setCountryCode: PropTypes.func.isRequired,
  countryCode: PropTypes.string.isRequired,
  phoneNumValid: PropTypes.bool,
  recaptchaLoading: PropTypes.bool,
}
