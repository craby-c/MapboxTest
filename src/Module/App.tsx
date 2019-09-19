import React, { Component, Fragment } from 'react';
import ReactMapGL from 'react-map-gl';
import './styles/App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { List } from './components/List';
import { MarkerPoint } from './components/MarkerPoint';
import { 
    ITripData,
    TCSSProperty,
    TActiveTrip,
    IDurationFactor,
    IDuration,
    IViewport,
    IProps,
    IPlace
} from './Models';
import {
    defaultDiameter,
    defaultViewport,
} from './Consts';


interface IState {
    viewport: IViewport,
    activeTrip: TActiveTrip | [],
    data: ITripData[],
    diameters: IDurationFactor
}

class App extends Component<IProps, IState> {
    state: IState = {
        viewport: defaultViewport,
        activeTrip: [],
        data: [],
        diameters: {}
    }

    componentDidMount(): void {
        this.getData()
    }

    componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if (this.state.data !== prevState.data) {
            this.setState({ diameters: this.calculateDiameter() })
        }
    }

    getData = (): void => {
        fetch('/data.json')
            .then(response => {
                return response.json()
            })
            .then((data: ITripData[]) => {
                this.setState({
                    data: data
                })
            })
    }

    getPoints = (data: ITripData[]): Map<number, IPlace> => {
        let points: Map<number, IPlace> = new Map();

        data.forEach((trip: ITripData) => {
            const {
                "start station latitude": start_lat,
                "start station longitude": start_lon,
                "start station name": start_name,
                "start station id": start_id,
                "end station latitude": end_lat,
                "end station longitude": end_lon,
                "end station name": end_name,
                "end station id": end_id
            } = trip;
            const start_place: IPlace = {
                point: [start_lat, start_lon],
                name: start_name
            };
            const end_place: IPlace = {
                point: [end_lat, end_lon],
                name: end_name
            };
            points.set(start_id, start_place);
            points.set(end_id, end_place);
        })
        return points;
    }

    renderPoints = (): JSX.Element[] => {
        const { data, activeTrip } = this.state;
        const points: Map<number, IPlace> = this.getPoints(data);
        const markers: JSX.Element[] = [];

        points.forEach((value: IPlace, key: number) => {
            const { point: [latitude, longitude], name } = value;
            // TODO: refactor line below
            // @ts-ignore
            const isActive: boolean = activeTrip.includes(key);
            const activeDiameter: TCSSProperty = isActive ? this.getDiameter() : undefined;

            markers.push(
                <MarkerPoint
                    key={key}
                    isActive={isActive}
                    activeDiameter={activeDiameter}
                    latitude={latitude}
                    longitude={longitude}
                    name={name}
                />
            )
        })
        return markers
    };

    calculateDiameter = (): IDurationFactor => {
        const { data } = this.state;
        // Make array with all durations
        let durations = data.map((trip: ITripData) => trip.tripduration).sort();
        // Last duration is bigest in sorted array
        const longest = durations[durations.length - 1];
        const diameters: IDurationFactor = {};

        durations.forEach((dur: number) => {
            // Fill object with duration keys and values which multiplied by 
            // factor of longest trip
            diameters[dur] = dur / longest + 1;
        })
        return diameters;
    }

    getDiameter = (): number => {
        if (this.state.activeTrip[2]){
            const { duration } = this.state.activeTrip[2];
            const value = this.state.diameters[duration];

            if (value) {
                return value * defaultDiameter
            }
        }

        return defaultDiameter
    }

    handleSetActiveTrip = (start: number, end: number, duration: number) => (): void => {
        this.setState({
            activeTrip: [start, end, { duration: duration }]
        })
    }

    handleClearActiveTrip = (): void => {
        this.setState({ activeTrip: [] })
    }

    handleChangeViewport = (viewport: IViewport | any) => {
        this.setState({ viewport })
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={this.handleChangeViewport}
                    style={{
                        display: 'inline-block'
                    }}
                >
                    {this.renderPoints()}
                </ReactMapGL>
                <div className="list">
                    <List
                        data={data}
                        onHover={this.handleSetActiveTrip}
                        onBlur={this.handleClearActiveTrip}
                    />
                </div>
            </Fragment>
        )
    }
}

export default App;
