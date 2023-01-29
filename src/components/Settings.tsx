import React, { ReactElement } from 'react'; 

const Settings = (): ReactElement => {
    return (
        <div className="flex">
                <h1>Settings</h1>
                <button name="Home"></button>
                <button name="Profile"></button>
                <button name="Preferences"></button>
                <button name="Voting"></button>
                <button name="Logout"></button>
        </div>
    );
}

export default Settings; 