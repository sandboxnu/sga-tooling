import React, { ReactElement } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

/**
 * Creates an alert with the given string message.
 * 
 * @returns The alert component
 */
const Alert = (props: {message: string, className?: string}): ReactElement =>  {
    return (
        <div className={`flex items-start space-x-2 text-left bg-warning-light rounded-lg p-3 text-sm h-fit ${props.className}`} role="alert">
            <ExclamationCircleIcon className="w-12 fill-warning-dark flex-none stroke-white"/>
            <span className="font-medium self-center">{props.message}</span>
        </div>
    );
}

export default Alert;