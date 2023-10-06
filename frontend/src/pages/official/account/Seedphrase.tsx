import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Box } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

type SeedphraseProps = {
  seedPhrase: string;
  handleCopy: () => void;
};

export default function Seedphrase(props: SeedphraseProps) {
  const { seedPhrase, handleCopy } = props;
  return (
    <Box>
      <Alert sx={{ marginBottom: 3, marginTop: 1 }} icon={false}>
        The seedphrase is imposible to recover if lost. Copy the generated seed
        to a safe location.
      </Alert>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            color="primary"
            component="div"
            sx={{ fontFamily: 'Oswald', margin: 0, marginBottom: 1 }}
            gutterBottom
          >
            Seedphrase
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {seedPhrase}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <CopyToClipboard text={seedPhrase} onCopy={handleCopy}>
            <Button variant="outlined" size="small">
              copy seedphrase
            </Button>
          </CopyToClipboard>
        </CardActions>
      </Card>
    </Box>
  );
}
