import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class DownloadButton extends Component {
  render() {
    if (this.props.selectedStores.length > 0) {
      return (
        <Row>
          <Col xs={2}></Col>
          <Col xs={8}>
            <Button
              bsStyle="primary"
              onClick={this.props.download}
              style={{width: '100%', fontSize: '30px'}}
            >
              Download to csv
            </Button>
          </Col>
          <Col xs={2}></Col>
        </Row>
      )
    }

    return null;
  }
}

export default class StoreListComponent extends Component {
  render() {
    return (
      <Grid fluid>
        {this.props.selectedStores.map((store, i) => {
          return (
            <Row>
              <Col xs={10} style={{border: '2px solid white'}}>
                <div style={{padding: '5px'}}>{store.address}</div>
              </Col>
              <Col xs={2}>
                <Button
                  bsStyle="danger"
                  onClick={this.props.removeStore(store.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          )
        })}

        <DownloadButton
          selectedStores={this.props.selectedStores}
          download={this.props.download}
        />

      </Grid>
    )
  }
}
