import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'
import { SetDeltaAir } from '../Redux/ActionCreator'

import { CstText, CstDelta } from '../Cst'
import Display from './ControlElements/Display'
import Button from './ControlElements/Button'

const AirComponent = () => {
  const { PanelTxt: { Air: AirTxt } } = CstText
  const { Air, DeltaAir } = useSelector((state) => ({ Air: state.Air, DeltaAir: state.DeltaAir }))
  const dispatch = useDispatch()

  const StartCharging = () => {
    // already charging ?
    if (DeltaAir > 0) return
    // start by setting delta
    dispatch(SetDeltaAir(CstDelta.ChargeAir))
  }

  return (
    <>

      <Row>
        <Display
          Title={AirTxt.Title}
          Width={50}
          Text={Air.toString(10)}
          Suffix={AirTxt.Suffix}
        />
      </Row>
      <Row>
        <Col auto>
          <Button
            Width={100}
            Caption={AirTxt.BtnFill}
            Color="SteelBlue"
            TextColor="FloralWhite"
            cb={() => StartCharging()}
          />
        </Col>
      </Row>

    </>
  )
}

export default AirComponent
