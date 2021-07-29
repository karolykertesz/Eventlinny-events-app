import { Tooltip, OverlayTrigger } from "react-bootstrap";
import classes from "../ui-modules/tooltip.module.css";
const TooltipTop = (props) => {
  const renderTooltip = () => (
    <Tooltip className={classes.top}>{props.title}</Tooltip>
  );

  return (
    <div className={classes.all}>
      <OverlayTrigger
        placement={props.place}
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <div className={classes.btn}>{props.children}</div>
      </OverlayTrigger>
    </div>
  );
};

export default TooltipTop;
