//need to actually import the event
import { ReactElement } from "react";
import Frame from ".././assets/Frame.svg";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import { Event } from "./EventCard";


export type EventDetailsProps = {
    event: Event;
}

//have to destructure fields when passing in props otherwise a bit weird
//For future reference to pass in event props do this : { event }: EventDetailsProps
const EventDetails = (): ReactElement => {

    return (
        <div className="flex h-screen w-screen flex-col p-10" style={{ gap: "2rem" }}>
            <div className="flex flex-row items-center  " style={{ gap: "1rem" }}>
                <img
                    src={Frame}
                    alt="Back arrow"
                    className="p-1 pt-0 block" />

                <h1 className="section-heading m-0 text-left w-full md:w-2/12">
                    <span>EVENT DETAILS</span>
                </h1>
                <img
                    src={MeatballMenuSVG}
                    alt="Menu svg"
                    aria-label="Open Event Card details"
                />
            </div>
            <hr className="border-black home-mx -ml-0 -mr-0" />
            <div className="flex flex-row " >
                <div className="not-italic font-bold text-2xl leading-8 font-sans break-words ">
                    Sample Event
                </div>
            </div>
            <div className="flex flex-col w-full justify-center md:justify-start " style={{ gap: "1rem" }}>
                <div className="flex flex-row md:flex-col">
                    <div className="w-48 h-48 bg-no-repeat bg-isec bg-cover margin-0 rounded-bl-2xl md:w-full md:h-40 md:rounded-tr-3xl md:rounded-bl-none" style={{ gap: 0 }}>
                    </div>
                    <div className="w-48 h-48 bg-sga-red rounded-r-2xl text-white text-right md:w-full md:h-40 md:text-left md:rounded-bl-2xl md:rounded-t-none ">
                        <div className="m-3 md:m-5">
                            <div className=" font-sans font-bold text-5xl">19</div>
                            <div className="text-l">
                                <span className="font-sans font-bold">August</span> <span className="font-montserrat ">'22</span><br />
                                <span className="font-montserrat">Mon</span>
                            </div>
                            <div className="mt-10 font-sans font-bold text-l md:mt-0"> 8AM - 11AM</div>
                        </div>
                    </div>
                </div>
                <div className=" flex-col w-96 ">
                    <p className="text-body-mobile font-montserrat break-words w-full  ">
                        Sample text. Please don't read this area. If you do you may be subjet to legal action. Here's a bunch of random text that I'm typing to fill this area.
                    </p>
                </div>

            </div>
        </div>

    );
}

export default EventDetails