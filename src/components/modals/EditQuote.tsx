import { useEffect, useState } from "react";
import { useCreateQuoteMutation } from "../../store";
import { Button } from "../ui/Button";
import { ModalFooter } from "../ui/Modal/ModalFooter";
import { ModalHeader } from "../ui/Modal/ModalHeader";
import classes from "./EditQuote.module.css";

export type EditQuoteProps = {
  closeModal: () => void;
};

export const EditQuote = ({ closeModal }: EditQuoteProps) => {
  const [quote, setQuote] = useState("");
  const [createQuote, { error, isSuccess, isLoading }] =
    useCreateQuoteMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     let timer = setTimeout(() => {
  //       closeModal();
  //     }, 1000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [isSuccess, closeModal]);


  // close modal after successful insert.
  // todo: 
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const onCreateQuote = async () => {
    createQuote({ quote });
    // console.log(res.quote);
  };
  return (
    <div className={classes.content}>
      <ModalHeader
        heading={
          <h4>
            Are you feeling <span className="orange">inspired?</span>
          </h4>
        }
        subtitle="You can post quotes. You can delete them on your profile."
      />
      {error && <p className="error">There's been an error creating quote.</p>}
      <form>
        <textarea
          disabled={isLoading}
          className={classes.tarea}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setQuote(e.target.value)
          }
          rows={4}
        ></textarea>
      </form>
      <ModalFooter
        actions={[
          <Button
            type="primary"
            onClickHandler={() => onCreateQuote()}
            title="Submit"
            key={"submitbtn"}
          />,
          <Button
            type="alternative"
            onClickHandler={() => closeModal()}
            title="Cancel"
            key="cancelbtn"
          />,
        ]}
      />
    </div>
  );
};
