import React from 'react';
import { ReactElement } from "react";


export interface EventDetailsProps {
    time: string,
    name: string,
    location: string,
    description: string,
}

/**
 * Renders an event and its full details
 * 
 * TODO: menu button and back button behavior
 * TODO: waiting on desktop version
 */
const EventDetails = ({
    time,
    name,
    location,
    description,
}: EventDetailsProps): ReactElement => {
    return(
        <></>
    );
}

export default EventDetails;