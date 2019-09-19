import React from 'react';
import { getTime, getDuration } from '../Utils';

export const List = (props: any) => {
    const { data, onHover, onBlur } = props;
    return data.map((el: any) => {
        const {
            tripduration,
            starttime,
            stoptime,
            "start station id": start_id,
            "end station id": end_id,
            "start station name": start_name,
            "end station name": end_name
        } = el;
        return (
            <div
                className="list-item"
                onMouseEnter={onHover(start_id, end_id, tripduration)}
                onMouseLeave={onBlur}
                key={tripduration + start_id + end_id}
            >
                <p>
                    Start: <b>{getTime(starttime)}</b><br />
                    From: <b>{start_name}</b>
                </p>
                <p>
                    Stop: <b>{getTime(stoptime)}</b><br />
                    At: <b>{end_name}</b>
                </p>
                Duration is about <b>{getDuration(tripduration)} min.</b>
            </div>
        )
    })
}
