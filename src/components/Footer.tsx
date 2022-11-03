import { ReactElement } from "react";
import ".././styles.css";

// Footer with source code and project information that goes at the bottom of each page
const Footer = (): ReactElement => {
	return (
		<div className="w-full px-2 py-4 mt-4 flex flex-row justify-between border-t-2 absolute bottom-0">
			<div>
				Made by students @
				<a
					href="https://sandboxnu.com"
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					Sandbox
				</a>
				. Source on
				<a
					href="https://github.com/sandboxnu/sga-tooling"
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub.
				</a>
			</div>

			<div>
				<a
					href="https://github.com/sandboxnu/office-hours/discussions"
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					Give us feedback
				</a>
				<span> or </span>
				<a
					href="https://github.com/sandboxnu/office-hours/issues"
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					File a bug report
				</a>
			</div>
		</div>
	);
};

export default Footer;
