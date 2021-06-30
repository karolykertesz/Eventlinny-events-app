import classes from "../ui-modules/styled.module.css";

const Videocamera = (props) => {
  const inPutType = props.inPutType;
  return (
    <div
      style={{ width: props.width, height: props.height, color: props.color }}
      className={inPutType === "map" ? classes.vidcam : classes.vidCam}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};

export default Videocamera;