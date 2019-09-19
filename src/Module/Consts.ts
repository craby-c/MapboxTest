import { IViewport, IMarkerStyle } from './Models';

export const defaultDiameter: number = 8;

export const defaultMarkerStyle: IMarkerStyle = {
    backgroundColor: 'blue',
    width: defaultDiameter,
    height: defaultDiameter
};

export const activeMarkerStyle: IMarkerStyle = {
    backgroundColor: 'red'
}

export const defaultViewport: IViewport = {
    height: '100%',
    width: '80%',
    latitude: 40.7162469,
    longitude: -74.0334588,
    zoom: 10,
    mapboxApiAccessToken: 'pk.eyJ1IjoidmVyYS1ic3QiLCJhIjoiY2swbDRtbnp2MHFkNzNjbXpmM2dxY2JvdCJ9.ZijZVOwjRxlDKjBHjAYdtw'
}
