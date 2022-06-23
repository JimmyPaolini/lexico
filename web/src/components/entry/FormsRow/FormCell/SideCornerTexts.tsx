import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';

import CornerText from './CornerText'

const PREFIX = 'SideCornerTexts';

const classes = {
  left: `${PREFIX}-left`,
  right: `${PREFIX}-right`
};

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.left}`]: {
    position: 'relative',
    left: 2,
  },

  [`& .${classes.right}`]: {
    position: 'relative',
    right: 2,
  }
}));

type Props = {
  top: string
  bottom: string
  side: 'right' | 'left'
}

export default function SideCornerTexts({ top, bottom, side }: Props) {

  return (
    <StyledGrid
      container
      xs
      direction="column"
      justifyContent="space-between"
      className={side === 'right' ? classes.right : classes.left}
    >
      <CornerText text={top} />
      <CornerText text={bottom} />
    </StyledGrid>
  );
}
