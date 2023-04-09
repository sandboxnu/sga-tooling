import { ReactElement } from "react";

const PopUp = (props: {
    source: string
    message1: string
    message2: string
}): ReactElement => {
    return (
        <div className="absolute top-0 right-0 bottom-0 left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
            <div className="flex items-center flex-col h-2/4 w-2/4 my-2.5 bg-white text-white text-2xl font-semibold rounded-lg px-4 py-4">
                <img src={props.source} alt="Error Icon" className="py-4" />
                <div className="py-3 flex justify-center items-center flex-col justify-between h-full text-black">
                    <p>{props.message1}</p>
                    <p>{props.message2}</p>
                    <button>Accept</button>
                </div>
            </div>
        </div>

    );
}

export default PopUp; 