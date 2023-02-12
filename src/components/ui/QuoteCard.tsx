import { Quote } from "../../interfaces/Quote";
import classes from "./QuoteCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./IconButton";
import { useUpvoteMutation } from "../../store";

export type QuoteProps = Quote & {
  isBlurred?: boolean;
};

export const QuoteCard: React.FC<QuoteProps> = ({
  id,
  quote,
  user,
  upvotes,
  downvotes,
  isUpvoted,
  isDownvoted,
}: QuoteProps) => {
  const [upvote] = useUpvoteMutation();

  const onUpvoteClick = (id: number) => {
    upvote(id);
  };

  const onDownvoteClick = (id: number) => {
    console.log(`downvote: ${id}`);
  };

  return (
    <div className={classes["card-container"]}>
      <div className={classes.voting}>
        <IconButton onClickHandler={() => onUpvoteClick(id)}>
          <FontAwesomeIcon
            icon={faAngleUp}
            className={`${isUpvoted ? "orange" : ""}`}
          />
        </IconButton>

        {upvotes - downvotes}
        <IconButton onClickHandler={() => onDownvoteClick(id)}>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`${isDownvoted ? "orange" : ""}`}
          />
        </IconButton>
      </div>
      <div className={classes.quote}>
        <p>{quote}</p>
        <div>{user.username}</div>
      </div>
    </div>
  );
};
