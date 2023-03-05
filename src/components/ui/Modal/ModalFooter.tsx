import { ReactNode } from "react";

export type ModalFooterProps = {
  actions: Array<ReactNode>;
};

export const ModalFooter = ({ actions }: ModalFooterProps) => {
  return <div style={{ display: "flex", gap: 10 }}>{actions}</div>;
};
