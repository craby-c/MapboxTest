import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import {
    defaultDiameter,
    defaultMarkerStyle,
    activeMarkerStyle
} from '../Consts';

interface IProps {
    latitude: number,
    longitude: number,
    activeDiameter: number | undefined,
    isActive: boolean,
    name: string
}

export const MarkerPoint = (props: IProps) => {
    const {latitude, longitude, activeDiameter, isActive, name} = props;

    return (
        <div>
            <Marker
                latitude={latitude}
                longitude={longitude}
            >
                <div
                    className="circle-marker"
                    style={
                        isActive ?
                            {
                                ...activeMarkerStyle,
                                width: activeDiameter,
                                height: activeDiameter
                            } : { ...defaultMarkerStyle }
                    }
                >
                </div>
            </Marker>

            {isActive && (
                <Popup
                    latitude={latitude}
                    longitude={longitude}
                    closeButton={false}
                    anchor="bottom"
                    offsetLeft={(activeDiameter || defaultDiameter) / 2}
                >
                    {name}
                </Popup>
            )}
        </div>
    )
}
