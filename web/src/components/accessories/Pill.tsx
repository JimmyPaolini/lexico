import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

type PillProps = {
  backgroundColor: string;
  color: string;
};

const Pill: FC<PillProps> = ({
  backgroundColor = "#000000",
  color = "#FFFFFF",
  children,
}) => {
  const classes = useStyles();

  return (
    <Typography
      variant="button"
      className={classes.pill}
      style={{ color, backgroundColor }}
      align="center"
      noWrap
    >
      {children}
    </Typography>
  );
};

const useStyles = makeStyles(() => ({
  pill: {
    width: "min-content",
    height: 24,
    padding: "0px 6px",
    borderRadius: 100,
  },
}));

export default Pill;
