import Link from "next/link";
import Image from "next/image";
import classes from "../components/UI/ui-modules/achivecontainer.module.css";
const ArcCont = (props) => {
  const { item } = props;
  return (
    <div className={classes.card}>
      <input type="checkbox" id={item.key} className={classes.checker} />
      <div className={classes.cardheader}>
        <div className={classes.month}>{item.key}</div>
        <Image
          src="/images/american.jpg"
          width="350px"
          height="250px"
          quality={100}
        />

        <div className={classes.cover}></div>
        <div className={classes.menu}></div>
        <div className={classes.name}>
          <span className={classes.last}></span>
          <span className={classes.first}></span>
        </div>
      </div>
      <div className={classes.hamCont}>
        <label htmlFor={item.key} className={classes.ham}>
          <div className={classes.line}></div>
          <div className={classes.line}></div>
        </label>
      </div>
    </div>
  );
};

export default ArcCont;
