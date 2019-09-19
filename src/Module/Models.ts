// Input data model
export interface ITripData {
    "tripduration": number,
    "starttime": string,
    "stoptime": string,
    "start station id": number,
    "start station name": string,
    "start station latitude": number,
    "start station longitude": number,
    "end station id": number,
    "end station name": string,
    "end station latitude": number,
    "end station longitude": number,
    "bikeid": number,
    "usertype": string,
    "birth year": number,
    "gender": number
}

// Any props model
export interface IProps {
    [key: string]: any
}

export interface IViewport {
    height: string | number,
    width: string | number,
    latitude: number,
    longitude: number,
    zoom: number,
    mapboxApiAccessToken: string
}

// Changing style props model
export interface IMarkerStyle {
    width?: TCSSProperty,
    height?: TCSSProperty,
    backgroundColor: string
}

// Any style prop model
export type TCSSProperty = string | number | undefined;

// Model of factors for modified durations
export interface IDurationFactor {
    [key: number]: number
}

export interface IDuration {
    duration: number
}

export interface IPlace {
    point: [number, number],
    name: string
}

export type TActiveTrip = [number, number, IDuration];
