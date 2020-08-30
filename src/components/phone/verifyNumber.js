import React from 'react'
import styled from 'styled-components'
import { withTranslation, Trans } from 'react-i18next'
import PropTypes from 'prop-types'

// compoonents
import {
  HeadMSG,
  ActionButton,
  Description,
  NumberInput,
  ActionText,
} from './common'

const VerifyNumber = ({
  primaryFont,
  setOtpCode,
  verifyCode,
  otpCode,
  codeValid,
  phoneNumber,
  setUserVerified,
  setOtpSent,
}) => {
  const verifyDescription = 'verify_number_description'
  const errorMessage = 'code_error_message'

  return (
    <InnerHolderVerify>
      <HeadMSG font={primaryFont}>
        <Trans>verify_number_head_msg</Trans>
      </HeadMSG>
      <NumberInput
        hasError={!codeValid}
        maxLength={6}
        type="text"
        font={primaryFont}
        value={otpCode}
        onChange={(e) => {
          const code = e.target.value.replace(/[^0-9]/g, '')
          setOtpCode(code)
        }}
      />

      <Description font={primaryFont}>
        <Trans>{codeValid ? verifyDescription : errorMessage}</Trans>
      </Description>
      <EditHolder>
        <Description margin={0} lineHeight={13} size={12} font={primaryFont}>
          <Trans>wrong_number</Trans>
          {` ${phoneNumber}`}
        </Description>

        <ActionText
          font={primaryFont}
          size={12}
          lineHeight={13}
          marginLeft={5}
          margin={0}
          onClick={() => {
            setOtpSent(false)
            setUserVerified(false)
          }}
        >
          <Trans>edit</Trans>
        </ActionText>
      </EditHolder>
      {otpCode.length === 6 && (
        <ActionButton
          id="sign-in-button"
          font={primaryFont}
          onClick={() => {
            verifyCode()
          }}
        >
          <Trans>next</Trans>
        </ActionButton>
      )}
    </InnerHolderVerify>
  )
}

const InnerHolderVerify = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
`

const EditHolder = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
`

VerifyNumber.defaultProps = { otpCode: '', phoneNumber: '0547557948' }

export default withTranslation()(VerifyNumber)

VerifyNumber.propTypes = {
  primaryFont: PropTypes.string.isRequired,
  setOtpCode: PropTypes.func.isRequired,
  verifyCode: PropTypes.func.isRequired,
  otpCode: PropTypes.string,
  codeValid: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string,
  setUserVerified: PropTypes.func.isRequired,
  setOtpSent: PropTypes.func.isRequired,
}
