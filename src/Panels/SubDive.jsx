import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-reflex-grid'

import { SetStart, StartTimer, StopTimer } from '../Redux/ActionCreator'
import { CstText } from '../Cst'
import ControlPanel from './ControlPanel'
import DivePanel from './DivePanel'
import Button from '../Components/ControlElements/Button'

const SubDive = () => {
  const dispatch = useDispatch()
  const RefChangeTimer = useSelector((state) => state.RefChangeTimer)
  useEffect(() => {
    dispatch(SetStart(0, 50, 0))
    dispatch(StartTimer())
  }, [])// eslint-disable-line

  // const Fouten = useSelector((state) => state.Fouten)
  const SubStatus = useSelector((state) => state.SubStatus)

  return (
    <Container full className="SubDive">
      <Button
        Width={100}
        Caption="STOP"
        Color="Red"
        TextColor="Yellow"
        cb={() => dispatch(StopTimer(RefChangeTimer))}
      />

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
