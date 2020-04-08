import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-reflex-grid'

import { CstText } from '../Cst'
import Display from './ControlElements/Display'


const DepthComponent = () => {
  const { PanelTxt: { Depth: DepthTxt } } = CstText
  const Depth = useSelector((state) => state.Depth)

  return (
    <Row>
      <Col auto>
        <Display
          Title={DepthTxt.Title}
          Width={50}
          Text={Depth.toString(10)}
          Suffix={DepthTxt.Suffix}
        />
      </Col>
    </Row>
  )
}

export default DepthComponent
