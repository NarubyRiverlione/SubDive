import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-reflex-grid'

import { SetDeltaBalast } from '../Redux/ActionCreator'
import { CstText, CstDelta } from '../Cst'
import Display from './ControlElements/Display'
import Button from './ControlElements/Button'

const BalastComponent = () => {
  const { PanelTxt: { Balast: BalastTxt } } = CstText
  const Balast = useSelector((state) => state.Balast)
  const dispatch = useDispatch()
  return (
    <>
      <Row>
        <Display
          Title={BalastTxt.Title}
          Width={50}
          Text={Balast.toString(10)}
          Suffix={BalastTxt.Suffix}
        />
      </Row>
      <Row>
        <Col auto>
          <Button
            Width={100}
            Caption={BalastTxt.BtnMin}
            Color="SteelBlue"
            TextColor="FloralWhite"
            cb={() => dispatch(SetDeltaBalast(-CstDelta.Balast))}
          />
        </Col>
        <Col auto>
          <Button
            Width={100}
            Caption={BalastTxt.BtnPlus}
            Color="SteelBlue"
            TextColor="FloralWhite"
            cb={() => dispatch(SetDeltaBalast(CstDelta.Balast))}
          />
        </Col>
      </Row>
    </>
  )
}

export default BalastComponent
