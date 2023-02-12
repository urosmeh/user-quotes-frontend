import classes from "./LandingPageHeader.module.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
  paddingTop?: boolean;
}

export const LandingPageHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  paddingTop,
}) => {
  return (
    <div
      className={`${classes.header} ${paddingTop ? classes["with-top-padding"] : ""}`}
    >
      <h4 className={classes.title}>{title}</h4>
      {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
    </div>
  );
};
