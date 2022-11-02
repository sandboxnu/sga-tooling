import React, { ReactElement } from "react";
import SearchIcon from "./SearchIcon.svg";

const Layout = (): ReactElement => {
	const liveEvent = true;

	return (
		<>
			<div className="p-4">
				{liveEvent && (
					<>
						<div className="flex py-4">Happening Now</div>

						<div className="absolute left-0 bg-gray-800 text-white w-14 h-10 rounded-r-xl flex justify-center items-center">
							Live
						</div>

						<hr className="hr" />
					</>
				)}
				<div className="flex items-center py-4">
					<div className="flex-1">Upcoming Events</div>
					<img src={SearchIcon} aria-label="Search for an event"></img>
				</div>
				<hr className="hr" />
			</div>
		</>
	);
};

export default Layout;
