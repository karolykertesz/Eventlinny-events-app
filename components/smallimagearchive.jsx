import Image from "next/image";
import classes from "../components/UI/ui-modules/smallimagearchive.module.css";
const SmallImageArchive = ({ itemdate, url }) => {
  const humandate = new Date(itemdate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={classes.topdiv}>
      <div className={classes.img}>
        <Image src={url} width="100px" height="100px" />
      </div>
      <div className={classes.date}>{humandate}</div>
    </div>
  );
};
export default SmallImageArchive;
