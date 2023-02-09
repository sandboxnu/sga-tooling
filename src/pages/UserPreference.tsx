import { ReactElement } from "react";
const UserPreference = () : ReactElement =>  {

    //some user validation.

    return (
        <div className="flex flex-col w-screen h-screen p-4 font-sans md:p-10" style={{gap: "2rem"}}>
            {/*The 2 rem here is to keep consistent with the rest of the padding in between sections below*/}
            <div className="flex flex-col font-sans font-bold ">
                <span className="text-gray-600 text-xl"> Hello,</span>
                <div className="flex flex-row justify-between">
                    <span className="section-heading m-0"> NORTHEASTERN SGA</span>
                    <button className="bg-gray-300 w-20 h-6 rounded text-gray-600"> Save</button>
                </div>  
            </div> 

            <div className="flex flex-col px-7 " style={{gap: "2rem"}}>

                <span className="font-bold text-xl">CONTACT INFO</span>
                <div className="flex flex-row gap-20">
                    <div className="flex flex-col">
                        <span className="text-gray-600">Name</span>
                        <span>Northeastern SGA</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Pronouns</span>
                        <span> Huskies/Rock</span>
                    </div>

                </div>
                <div className="flex flex-col">
                        <span className="text-gray-600">Email</span>
                        <span>northeastern@isbetterthanbu.com</span>
                 </div>

                 <div className="flex flex-col">
                    <span className="text-gray-600">Phone Number</span>
                    <span> +1 (911) 911 - 1911</span>
                </div>

                <hr className="border-black home-mx -ml-7 -mr-7"/>

                <div className="flex flex-col flex-wrap">
                    {/* whatever size this is make it the same as contact info*/}
                    <span className="font-bold font-sans">YOUR GROUPS</span>

                    <div className="flex flex-col md:flex-row gap-10 py-4 ">
                        <span className="bg-tag-green break-words rounded-lg text-sm font-bold font-sans px-4 py-1">Steast</span>
                        <span className="bg-tag-blue break-words rounded-lg text-sm font-bold font-sans px-4 py-1">Food Advisory Board</span>
                        <span className="bg-yellow-400 break-words rounded-lg text-sm font-bold font-sans px-4 py-1">Diverstiy, Equity, and Inclusion</span>
                    </div>    
                </div>
                <hr className="border-black home-mx -ml-7 -mr-7"/>

                <div className="flex flex-col" style={{gap: "1.5rem"}}>
                    <span className="font-bold"> PREFERENCES </span>
                    <div className="flex flex-row">
                        Recieve Notifications before my events
                    </div>

                    <div className="flex flex-row">
                        Recieve Notifications when new events are made
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPreference;