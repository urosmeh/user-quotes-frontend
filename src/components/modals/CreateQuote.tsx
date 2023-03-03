import { Button } from "../ui/Button";
import classes from "./CreateQuote.module.css";

export const CreateQuote = () => {
  return (
    <div className={classes.content}>
      <h4>
        Are you feeling <span className="orange">inspired?</span>
      </h4>
      <p>You can post quotes. You can delete then on your profile.</p>
      <form>
        <textarea className={classes.tarea} rows={4} style={{}}></textarea>
      </form>
      <div style={{ display: "flex", gap: 10 }}>
        <Button
          type="primary"
          onClickHandler={() => console.log("click")}
          title="Submit"
        />
        <Button
          type="alternative"
          onClickHandler={() => console.log("click")}
          title="Cancel"
        />
      </div>
    </div>
  );
};
