import React, { ReactElement, useContext, useState } from 'react';
import { LoginContext } from '../App';
// import { getUserInfo } from '../requests';

const LoginPage = (): ReactElement => {

    const {user, setUser} = useContext(LoginContext);
    const [input, setInput] = useState(""); // value is the value that the user entered

    function login() {
        if (input) {
            localStorage.setItem('user', JSON.stringify(`${input}`));
            setUser(parseInt(input));
        } else {
            alert("Error: Invalid NUID");
        }
    };

    return (

        <div>
            <div className="flex flex-col justify-end min-h-[68vh] bg-gradient-to-r from-red-300 to-gray-300">
                <div>
                    <form className="flex-col px-8 py-5 bg-transparent-gray rounded-tl-lg rounded-tr-lg shadow-xl">
                        <input value={input} type="text" id="nuid-entry" onChange={e => setInput(e.target.value)} className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 my-4" placeholder="NUID" required />
                        <button onClick={e => login()} className="w-full my-2.5 bg-sgared text-white text-2xl font-semibold rounded-lg px-2.5 py-4 hover:bg-sgared-hover active:bg-sgared-active">Log In</button>
                    </form>
                </div>
            </div>
            <div className="flex justify-center align-center">
                <img className="max-w-[100%] max-h-[100%]" src="https://giving.northeastern.edu/live/image/gid/2/width/1260/height/630/crop/1/src_region/294,25,1751,1483/484_Club_-_Student_Government_Association.jpg" alt="Student Government Association Logo" />
            </div>
        </div>

    );
}

export default LoginPage;