import React from 'react';
import Hamburger from "../assets/Hamburger.svg";

// Not sure how to make this into a function and keep the imageClick function
class HamburgerComponent extends React.Component {

    imageClick = () => {
        console.log('Click');
    } // not working idk why 

    render() {
        return (
            <div>
                <img className="w-12" src={Hamburger} onClick={this.imageClick} />
            </div>
        );
    }
}

export default HamburgerComponent;