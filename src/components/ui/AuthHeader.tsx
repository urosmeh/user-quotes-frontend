export type AuthHeaderProps = {
  header: string;
  subtitle: string;
};

export const AuthHeader = ({ header, subtitle }: AuthHeaderProps) => {
  let words = header.split(" ");
  const black = words.splice(0, words.length - 1).join(" ");
  const orange = words.splice(words.length - 1).join(" ");

  return (
    <>
      <h4>
        {black} <span className="orange">{orange}</span>
      </h4>
      <p>{subtitle}</p>
    </>
  );
};
