import { ReactElement } from 'react';
import ErrorIconSVG from '../errorIcon.svg';

const Error404 = ():ReactElement => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={ErrorIconSVG} alt="" />
            <div className="flex flex-col items-center font-sans mt-1 mb-12">
                <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
                <p className="text-xl text-center max-w-sm">We can't find the page you're looking for. Contact the site owner if this is a mistake. </p>
            </div>
            <button className="button-base-red rounded-xl py-3 px-14 md:[py-5 px-20]">Return to home</button>
        </div>
    );
}

export default Error404;