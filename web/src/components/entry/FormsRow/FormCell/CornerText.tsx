import Typography from '@mui/material/Typography'

export default function CornerText({ text }: { text: string }) {
  return (
    <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
      {text}
    </Typography>
  )
}
