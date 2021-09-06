import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  balanceContext: {
    flex: 1,
  },
});

export default function Balance({balance, showBalance, handleBalance}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Balance</Title>
      {!showBalance && 
        <Typography component="p" variant="h4">
          $ ******,**
        </Typography>
      }
      {showBalance && 
        <Typography component="p" variant="h4">
          $ {balance}
        </Typography>
      }
      <Typography color="textSecondary" className={classes.balanceContext}>
        {new Date().toDateString()}
      </Typography>
      <div>
        <Link color="primary"  onClick={handleBalance}>
          View Balance and Spot Coins
        </Link>
      </div>
    </React.Fragment>
  );
}