import TriangleError from "../assets/TriangleError.svg";

export const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={TriangleError} alt="" />
      <div className="flex flex-col items-center font-sans mt-1 mb-12">
        <p className="text-xl text-center max-w-sm">
          Oops! Something went wrong.
        </p>
        <p className="text-xl text-center max-w-sm">
          This page failed to load. Please try again another time.
        </p>
      </div>
    </div>
  );
};

export default ErrorComponent;
