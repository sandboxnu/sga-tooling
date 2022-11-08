import { ReactElement } from 'react';
import SVGFile from '../errorIcon.svg';

const Error404 = ():ReactElement => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center mx-2xl min-h-[70vh]">
                <img src={SVGFile} alt="" />
                <div className="flex flex-col items-center font-sans mt-1 mb-6">
                    <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
                    <p className="text-xl text-center">We can't find the page you're looking for. Contact the site owner if this is a mistake. </p>
                </div>
                <button className="bg-sgared text-white font-sans font-bold text-xl rounded-xl shadow-md shadow-neutral-400 px-[18vw] py-[0.8vh]">Return to home</button>
            </div>
        </div>
    );
}

export default Error404;