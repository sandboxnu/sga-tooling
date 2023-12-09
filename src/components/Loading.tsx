import { ReactElement } from "react";
import Lottie from "react-lottie";
import LoadingJSON from "../assets/loading.json";

type LoadingProps = {
  fullScreen?: boolean;
};

/**
 * Creates a Loading animation.
 *
 * @returns The loading component
 */
const Loading = ({ fullScreen = true }: LoadingProps): ReactElement => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const containerProps = `w-full flex justify-center items-center ${
    fullScreen ? " h-[100vh]" : " max-h-fit"
  }`;

  return (
    <div className={containerProps}>
      <div className="w-1/2 min-w-fit h-fit">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Loading;
