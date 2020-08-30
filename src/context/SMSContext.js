import React, { createContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// firebase
import app, { db } from '../base'

const SMSContext = createContext({})

const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [smsBody, setSMSBody] = useState('')
  const [phoneNumValid, setPhoneNumValid] = useState(false)
  const [hasBody, setHasBody] = useState(false)
  const [countryCode, setCountryCode] = useState('+233')
  const [verfyThisNumber, setVerfyThisNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSMSSuccess, setShowSMSSuccess] = useState(true)
  const [recipientNumber, setRecipientNumber] = useState('')
  const [recipientNumValid, setRecipientNumValid] = useState(true)
  const [hasValidBody, setHasValidBody] = useState(true)

  const saveSMS = useCallback(() => {
    setIsLoading(true)

    db.collection(`users`)
      .doc(currentUser.uid)
      .collection(`sms`)
      .add({
        recipientNumber: verfyThisNumber,
        smsBody,
      })
      .then(() => {
        setShowSMSSuccess(true)
        setIsLoading(false)
        setPhoneNumValid(false)
        setHasBody(false)
        setSMSBody('')
      })
      .catch(() => setIsLoading(false))
  }, [currentUser, smsBody, verfyThisNumber])

  useEffect(() => {
    if (phoneNumValid && hasBody) saveSMS()
  }, [phoneNumValid, hasBody, saveSMS])

  useEffect(() => {
    app.auth().useDeviceLanguage()

    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  function validateRecipientPhoneNumber() {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      `${countryCode}${recipientNumber}`
    )

    if (parsedPhoneNumber && parsedPhoneNumber.isValid()) {
      setVerfyThisNumber(parsedPhoneNumber.number)
      setPhoneNumValid(true)
      setRecipientNumValid(true)
    } else {
      setPhoneNumValid(false)
      setRecipientNumValid(false)
    }
  }

  function validateBody() {
    if (smsBody.length < 2) {
      setHasBody(false)
      setHasValidBody(false)
    } else {
      setHasBody(true)
      setHasValidBody(true)
    }
  }

  return (
    <SMSContext.Provider
      value={{
        currentUser,
        phoneNumValid,
        validateRecipientPhoneNumber,
        setCountryCode,
        setCurrentUser,
        setSMSBody,
        isLoading,
        showSMSSuccess,
        recipientNumber,
        setRecipientNumber,
        hasBody,
        validateBody,
        recipientNumValid,
        hasValidBody,
        smsBody,
      }}
    >
      {children}
    </SMSContext.Provider>
  )
}

SMSContext.ProviderWrapper = Provider

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SMSContext
