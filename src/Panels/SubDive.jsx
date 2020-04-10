import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-reflex-grid'

import { SetStart } from '../Redux/ActionCreator'
import { CstText } from '../Cst'
import ControlPanel from './ControlPanel'
import DivePanel from './DivePanel'


const SubDive = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(SetStart(0, 50, 0))
  }, [])// eslint-disable-line

  // const Fouten = useSelector((state) => state.Fouten)
  const SubStatus = useSelector((state) => state.SubStatus)

  return (
    <Container full className="SubDive">
      <ControlPanel
        Name={CstText.PanelTxt.Title}
        Status={SubStatus}
      >
        <DivePanel />
      </ControlPanel>

    </Container>
  )
}

export default SubDive
