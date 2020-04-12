import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-reflex-grid'
import Display from '../Components/ControlElements/Display'


const ControlPanel = ({ Name, Status, children }) => (
  <Container className="CardStyle" id={`${Name} panel`}>
    <Row>
      <Col auto className="CardHeader">
        <span style={{ marginRight: 10 }}>{Name}</span>
      </Col>
      <Col size={6}>
        <Display
          Width={500}
          Text={Status}
        />
      </Col>
    </Row>

    <Row>
      <Col auto className="CardContent">
        {children}
      </Col>
    </Row>
  </Container>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  Status: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ControlPanel.defaultProps = {
  Status: '',
}

export default ControlPanel
