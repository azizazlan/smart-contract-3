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
import { MerchantTransaction } from '../../services/transactionType';
import { useMerchantSelector } from '../../services/hook';
import { MerchantState } from '../../services/store';

interface ColumnData {
  dataKey: keyof MerchantTransaction;
  label: string;
  numeric?: boolean;
  width: number;
}

function createData(
  id: number,
  claimantPublicKey: string,
  tokenId: number,
  value: number,
  timestamp: number
): MerchantTransaction {
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

const VirtuosoTableComponents: TableComponents<MerchantTransaction> = {
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

function rowContent(_index: number, row: MerchantTransaction) {
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
  const { transactions } = useMerchantSelector(
    (state: MerchantState) => state.merchant
  );

  return (
    <Paper
      elevation={0}
      style={{ height: winSize.height - 260, width: winSize.width - 5 }}
    >
      <TableVirtuoso
        data={transactions}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
