import { useContext } from 'react'

// Context
import { SMSContext } from '../context'

const useSMS = () => {
  const smsContext = useContext(SMSContext)

  return { smsContext }
}

export default useSMS
