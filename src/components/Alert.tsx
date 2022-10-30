import React, { ReactElement } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

/**
 * Creates an alert with the given string message.
 * 
 * @returns The alert component
 */
const Alert = (props: {message: string, className?: string}): ReactElement =>  {
    return (
        <div className={`flex items-start space-x-2 text-left bg-warning-light rounded-2xl p-3 text-sm h-fit ${props.className}`} role="alert">
            <ExclamationCircleIcon className="w-12 fill-warning-dark flex-none stroke-white"/>
            <span className="font-bold text-base self-center">{props.message}</span>
        </div>
    );
}

export default Alert;