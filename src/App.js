import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FileSaver from 'file-saver';

import MapComponent from './MapComponent.js';
import StoreListComponent from './StoreListComponent.js';
import stores from './data/stores_unicode.json';
import './App.css';

var markers = [];
var count = 0;
for (let key in stores) {
  if (!stores.hasOwnProperty(key)) continue;

  markers.push({
    id: count,
    address: key,
    position: stores[key]
  })
  count++;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: []
    };
    this.addStore = this.addStore.bind(this);
    this.removeStore = this.removeStore.bind(this);
    this.download = this.download.bind(this);
  }

  addStore(id) {
    return () => {
      this.setState((prevState, props) => {
        if(!prevState.selectedStores.includes(markers[id])) {
          return {selectedStores: [...prevState.selectedStores, markers[id]]};
        }
        else {
          return prevState;
        }
      })
    }
  }

  removeStore(id) {
    return () => {
        this.setState((prevState, props) => {
            return {selectedStores: prevState.selectedStores.filter
                    (store => store.id !== id)};
        })
    }
  }

  download() {
    var file_str = "Address;Latitude;Longitude";
    for (let store of this.state.selectedStores) {
        file_str += "\n" + store.address + ";" + store.position.lat + ";"
            + store.position.lng;
    }

    var blob = new Blob([file_str], {type: "text/csv;charset=utf-8"});
    FileSaver.saveAs(blob, "micromania_stores.csv");
  }

  render() {
    const headerStyle = {
      backgroundColor: '#0A0A0B',
      height: '15vh',
      minHeight: '100px',
      width: '100vw',
      marginTop: 0
    };
    const mapStyle = {
      height: '85vh',
      width: '100%'
    }
    const sideBarStyle = {
      height: '100%',
      width: '100%'
    };
    console.log(this.state);
    return (
      <Grid fluid>
        <Row style={headerStyle}>
          <h1 style={{marginLeft: '40vw'}}>Magasins Micromania</h1>
        </Row>

        <Row style={{marginLeft: '-30px'}}>
          <Col xs={12} md={8}>
            <div style={mapStyle}>
              <MapComponent
                markers={markers}
                addStore={this.addStore}
              />
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div style={sideBarStyle}>
              <StoreListComponent
                selectedStores={this.state.selectedStores}
                removeStore={this.removeStore}
                download={this.download}
              />
            </div>
          </Col>
        </Row>
    </Grid>
    );
  }
}

export default App;
