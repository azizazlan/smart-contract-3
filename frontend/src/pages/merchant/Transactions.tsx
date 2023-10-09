import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { format } from 'date-fns';
import useWindowSize from '../../utils/useWindowSize';
import { TOKEN_NAMES } from '../../services/subsidyType';
import truncateEthAddr from '../../utils/truncateEthAddr';
import { Typography } from '@mui/material';
import TokenIcon from '../../commons/TokenIcon';

interface Data {
  tokenId: number;
  claimantPublicKey: string;
  value: number;
  id: number;
  timestamp: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number];

const sample: readonly Sample[] = [
  ['0x5c95a672e34B3252482eD9a215f2926d2887845D', 1, 1, new Date().getTime()],
  ['0xC4356aF40cc379b15925Fc8C21e52c00F474e8e9', 0, 1, new Date().getTime()],
  ['0x7CF8077D9371ac54C8b638c378E7d356eDAEf8f3', 1, 1, new Date().getTime()],
  ['0x582A8695Dc38C1e508383De53c5eC8c3534e6fE0', 0, 2, new Date().getTime()],
  ['0x8B733FE59d1190B3efA5bE3f21A574EF2aB0C62B', 1, 1, new Date().getTime()],
];

function createData(
  id: number,
  claimantPublicKey: string,
  tokenId: number,
  value: number,
  timestamp: number
): Data {
  return { id, claimantPublicKey, tokenId, value, timestamp };
}

const columns: ColumnData[] = [
  {
    width: 120,
    label: 'Claimant public key',
    dataKey: 'claimantPublicKey',
  },
  {
    width: 170,
    label: 'Token',
    dataKey: 'tokenId',
    numeric: false,
  },
  {
    width: 30,
    label: 'Value',
    dataKey: 'value',
    numeric: true,
  },
  {
    width: 120,
    label: 'Date and time',
    dataKey: 'timestamp',
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{
            width: column.width,
            fontFamily: 'Oswald',
            fontSize: '11pt',
            fontWeight: 'normal',
          }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column: ColumnData, index) => {
        if (index === 0) {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? 'right' : 'left'}
            >
              {truncateEthAddr(row[column.dataKey].toString())}
            </TableCell>
          );
        }
        if (index === 1) {
          return (
            <TableCell
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={column.dataKey}
              align={column.numeric || false ? 'right' : 'left'}
            >
              <TokenIcon
                tokenId={parseInt(row[column.dataKey].toString(), 10)}
              />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {TOKEN_NAMES[parseInt(row[column.dataKey].toString(), 10)]}
              </Typography>
            </TableCell>
          );
        }
        if (index === 3) {
          return (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? 'right' : 'left'}
            >
              {format(
                parseInt(row[column.dataKey].toString(), 10),
                'dd-MM-yyyy hh:mm:ss a'
              )}
            </TableCell>
          );
        }
        return (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );
}

export default function Transactions() {
  const winSize = useWindowSize();
  return (
    <Paper
      elevation={0}
      style={{ height: winSize.height - 260, width: winSize.width - 5 }}
    >
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
