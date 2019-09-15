import React, { Component, Fragment } from 'react';
import './App.css';
import { Map, TileLayer, Tooltip, CircleMarker, LayerGroup } from 'react-leaflet';
import { uniqWith, isEqual } from 'lodash';

const defaultMarkerStyle = {
  color: 'blue'
};

const activeMarkerStyle = {
  color: 'red'
}

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    data: [],
    activeIds: []
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {
    fetch('/data.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  renderPoints = () => {
    const { data, activeIds } = this.state;
    let points = [];
    let durations = [];
    data.forEach(el => {
      const {
        "start station latitude": start_lat,
        "start station longitude": start_lon,
        "start station name": start_name,
        "start station id": start_id,
        "end station latitude": end_lat,
        "end station longitude": end_lon,
        "end station name": end_name,
        "end station id": end_id,
        tripduration
      } = el;
      const start_place = {
        point: [start_lat, start_lon],
        name: start_name,
        id: start_id,
        duration: tripduration
      };
      const end_place = {
        point: [end_lat, end_lon],
        name: end_name,
        id: end_id,
        duration: tripduration
      };
      points.push(start_place);
      points.push(end_place);
      durations.push(tripduration)
    })
    const setOfPoints = uniqWith(points, isEqual);
    const markers = setOfPoints.map(el => {
      const {point, name, id} = el;
      const isActive = activeIds.includes(id);
      const initMarker = (ref) => {
        if (ref) {
          isActive 
            ? this.activateMarker(ref)
            : this.disactivateMarker(ref)
        }
      }
      durations = 

      this.calculateRadius(durations)
      return (
        <CircleMarker 
          center={point} 
          key={id}
          radius={4}
          ref={initMarker}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -20]}
          >
            {name}
          </Tooltip>
        </CircleMarker>
      )
    })
    return markers
  };

  activateMarker = (ref) => {
    const marker = ref.leafletElement;
    marker
      .openTooltip()
      .bringToFront()
      .setRadius()
      .setStyle(activeMarkerStyle)
  }

  disactivateMarker = (ref) => {
    const marker = ref.leafletElement;
    marker
      .closeTooltip()
      .setStyle(defaultMarkerStyle)
  }

  normalDurations = (dur_array) => {
    let durations = dur_array.sort();
    const longest = durations[-1];
    
  }

  calculateRadius = (durations, trip) => {

  }

  renderList = () => {
    const { data } = this.state;
    return data.map(el => {
      const {
        tripduration, 
        starttime, 
        stoptime,
        "start station id": start_id,
        "end station id": end_id,
        "start station name": start_name,
        "end station name": end_name,
      } = el;
      return (
        <div 
          className="list-el" 
          onMouseEnter={this.setActiveIds(start_id, end_id)}
          onMouseLeave={this.clearActiveIds}
          key={tripduration + start_id + end_id}
        >
          <p>{tripduration}</p>
          <p>{start_name} >>> {end_name}</p>
          <p>{starttime} - {stoptime}</p>
        </div>
      )
    })
  }

  setActiveIds = (start, end) => () => {
    this.setState({
      activeIds: [start, end]
    })
  }

  clearActiveIds = () => {
    this.setState({
      activeIds: []
    })
  }

  render() {
    const position = [40.7162469, -74.0334588];
    return (
      <Fragment>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayerGroup>
            {this.renderPoints()}
          </LayerGroup>
        </Map>
        <div className="list">
          {this.renderList()}
        </div>
      </Fragment>
    )
  }
}

export default App;
