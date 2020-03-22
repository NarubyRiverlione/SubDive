import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Container } from 'react-reflex-grid'

import { SetStart, ChangeTimer } from '../Redux/ActionCreator'
import { CstText } from '../Cst'
import ControlPanel from './ControlPanel'
import DivePanel from './DivePanel'

const SubDive = () => {
  const dispatch = useDispatch()
  //  const RefChangeTimer = useSelector((state) => state.RefChangeTimer)
  /*
  useEffect(() => {
    console.log('Called start')
    dispatch(SetStart(0))
    dispatch(ChangeTimer(null))
  }, [])// eslint-disable-line
*/
  // const Fouten = useSelector((state) => state.Fouten)
  const SubStatus = useSelector((state) => state.SubStatus)

  return (
    <Container full className="SubDive">

      <ControlPanel
        Name={CstText.PanelTxt.Title}
        StatusStatus={SubStatus}
      >
        <DivePanel />
      </ControlPanel>

    </Container>
  )
}

export default SubDive
