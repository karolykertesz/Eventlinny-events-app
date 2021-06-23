import Videocamera from "../components/UI/icons/videocamera";
import classes from "../components/holders/css/nocomment.module.css";
const Nomap = () => {
  return (
    <div className={classes.nocameraTop}>
      <p>Online Event:</p>
      <div className={classes.abs}>
        <Videocamera color="white" width="40px" inPutType="map" />
      </div>
    </div>
  );
};
export default Nomap;
