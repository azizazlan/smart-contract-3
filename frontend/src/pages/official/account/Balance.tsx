import { Box, Typography } from '@mui/material';

import { TOKEN_SHORTNAMES } from '../../../services/subsidyType';
import TokenIcon from '../../../commons/TokenIcon';

export default function Balance({
  tokenAllowances,
}: {
  tokenAllowances: number[];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Oswald',
            fontSize: '12pt',
            color: 'silver',
            marginRight: '3px',
            marginTop: '4px',
          }}
        >
          Allowances
        </Typography>
        {tokenAllowances.map((allowance, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 1,
            }}
          >
            <TokenIcon index={index} />
            <Typography
              color="primary"
              style={{
                fontFamily: 'Oswald',
                fontSize: '16pt',
                marginLeft: 7,
              }}
              key={index}
              variant="body1"
            >
              {allowance} {TOKEN_SHORTNAMES[index]} tokens
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
