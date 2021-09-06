import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  balanceContext: {
    flex: 1,
  },
});

export default function Balance({balance}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Balance</Title>
      <Typography component="p" variant="h4">
        $ {balance}
      </Typography>
      <Typography color="textSecondary" className={classes.balanceContext}>
        on {new Date().toDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}