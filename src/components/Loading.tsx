import { ReactElement } from "react";
import Lottie from "react-lottie";
import LoadingJSON from "../assets/loading.json";

/**
 * Creates a Loading animation.
 *
 * @returns The loading component
 */
const Loading = (): ReactElement => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // TODO: apparently you can just click on the animation to make it stop running, put something on this to disable clicking/messing with this

  return (
    <div className="w-full h-100 flex justify-center">
      <div className="w-1/2 min-w-fit">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Loading;
