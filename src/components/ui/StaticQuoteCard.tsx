import classes from "./QuoteCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { QuoteProps } from "./QuoteCard";

export type StaticQuoteCardProps = Partial<QuoteProps> & {
  username: string;
  position: "top" | "center" | "bottom";
  img: string;
};

export const StaticQuoteCard = ({
  quote,
  username,
  isBlurred,
  upvotes,
  downvotes,
  position,
  img,
}: StaticQuoteCardProps) => {
  let karma = 100;
  if (upvotes && downvotes) {
    karma = upvotes - downvotes;
  }
  return (
    <div
      className={`${classes["card-container"]} ${
        isBlurred === true ? classes["blurred"] : ""
      } ${position === "top" ? classes.top : ""} ${
        position === "bottom" ? classes.bottom : ""
      } ${position === "center" ? classes.center : ""}`}
    >
      <div className={classes.voting}>
        <FontAwesomeIcon icon={faAngleUp} className="orange" />
        {karma}
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <div className={classes.quote}>
        <p>{quote}</p>
        <div className={classes.user}>
          <img className={classes.avatar} src={img} alt="avatar" />
          {username}
        </div>
      </div>
    </div>
  );
};
