import { ReactElement } from "react";

const PopUp = (props: {
  source: string;
  message1: string;
  message2?: string;
  link?: string;
  useState: React.Dispatch<React.SetStateAction<number>>;
}): ReactElement => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
      <div className="flex items-center flex-col h-2/4 w-2/4 my-2.5 bg-white text-white text-2xl font-semibold rounded-lg px-4 py-4">
        <img src={props.source} alt="Error Icon" className="py-4" />
        <div className="py-3 flex justify-center text-center items-center flex-col justify-between h-full text-black">
          <p>{props.message1}</p>
          {props.link ? (
            <a href="https://github.com/sandboxnu/sga-tooling/issues">
              {props.link}
            </a>
          ) : (
            <p>{props.message2}</p>
          )}
          <button
            className="my-2.5 h-1/4 w-2/4 bg-black text-white text-2xl font-semibold rounded-lg hover:bg-[hsla(0, 0%, 75%)] active:bg-black"
            onClick={() => props.useState(0)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
