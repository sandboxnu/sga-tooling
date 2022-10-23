import React from 'react';
import { ReactElement } from "react";


interface EventCard {
    time: string,
    name: string,
    location: string,
    registeredAttendees: number,
    invitedAttendees: number,
}

// renders a single event
// TODO: what's the best way to have events occurring on the same day appear under inside the same date block?
// TODO: menu button
// TODO: onClick behavior for Register/Registered button (should be able to un-register from event?)
const EventCard = (): ReactElement => {
    return(
        <></>
    );
}

export default EventCard;