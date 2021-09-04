import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(name, amount, price, change, totalUSD, pandl) {
  return { name, amount, price, change, totalUSD, pandl};
}

const rows = [
  createData('BTC', '85', '26', '65000', '999999', '%3143'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Coins() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Coins</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>24hs Change</TableCell>
            <TableCell>Total USD</TableCell>
            <TableCell>All Time P/L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.change}</TableCell>
              <TableCell>{row.totalUSD}</TableCell>
              <TableCell>{row.pandl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}