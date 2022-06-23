import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

import { Translation } from '../../../graphql/generated'

const PREFIX = 'TranslationBullet';

const classes = {
  translationBullet: `${PREFIX}-translationBullet`,
  bullet: `${PREFIX}-bullet`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.translationBullet}`]: {
    margin: 0, // need to overwrite the negative margin of the Grid component
  },

  [`& .${classes.bullet}`]: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.primary,
    margin: theme.spacing(1),
    flexShrink: 0,
  }
}));

type Props = {
  translation: Translation
}

export default function TranslationBullet({ translation }: Props) {

  return (
    <StyledGrid
      container
      item
      spacing={1}
      xs
      alignItems="flex-start"
      wrap="nowrap"
      className={classes.translationBullet}
    >
      <div className={classes.bullet} />
      <Typography color="textPrimary">{translation.translation}</Typography>
    </StyledGrid>
  );
}
