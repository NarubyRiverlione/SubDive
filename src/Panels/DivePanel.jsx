import React from 'react'

import { Col, Row } from 'react-reflex-grid'
// import { useSelector } from 'react-redux'

import AirComponent from '../Components/AirComponent'
import BalastComponent from '../Components/BalastComponent'
import DepthComponent from '../Components/DepthComponent'

const DivePanel = () => (
  <React.Fragment>
    <Row>
      <Col size={3}>
        <AirComponent />
      </Col>

      <Col auto>
        <BalastComponent />
      </Col>

      <Col size={4}>
        <DepthComponent />
      </Col>
    </Row>
  </React.Fragment>
)

export default DivePanel
