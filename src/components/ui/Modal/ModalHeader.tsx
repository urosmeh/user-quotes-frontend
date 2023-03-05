import { ReactNode } from "react";

export type ModalHeaderProps = {
  heading: ReactNode;
  subtitle?: string;
};

export const ModalHeader = ({ heading, subtitle }: ModalHeaderProps) => {
  return (
    <>
      {heading}
      <p>{subtitle}</p>
    </>
  );
};
