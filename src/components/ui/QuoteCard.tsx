import { Quote } from "../../interfaces/Quote";
import classes from "./QuoteCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faCog,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./IconButton";
import { RootState, useUpvoteMutation } from "../../store";
import signupAvatar from "../../assets/img/uploadAvatar.png";
import { useSelector } from "react-redux";

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
  const { token, userId } = useSelector((state: RootState) => state.authToken);
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
        <div className={classes.user}>
          <img
            src={
              user.avatar
                ? `http://localhost:3000/users/avatar/${user.avatar}`
                : signupAvatar
            }
            alt="quote-user"
          ></img>{" "}
          {user.username}
        </div>
      </div>
      {token && userId === user.id && (
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            flexDirection: "column",
            gap: "21px",
          }}
        >
          <div>
            <IconButton onClickHandler={() => console.log("settings")}>
              <FontAwesomeIcon icon={faCog} className="orange" />
            </IconButton>
          </div>
          <div>
            <IconButton onClickHandler={() => console.log("delete")}>
              <FontAwesomeIcon icon={faClose} className="orange" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};
