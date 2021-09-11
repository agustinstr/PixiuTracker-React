import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import { useHistory } from 'react-router-dom';

const MainListItems = () => {
  const history = useHistory();

  const handleTotalBalances = () => {
    history.push("/balances");
  }

  const handlePriceFluctuation = () => {
    history.push("/prices");
  }

  const handleDashboard = () => {
    history.push("/");
  }

  return(
    <div>
      <ListItem button onClick = {handleDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick= {handlePriceFluctuation}>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Price Charts" />
      </ListItem>
      <ListItem button onClick= {handleTotalBalances}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Total Balances" />
      </ListItem>
    </div>
  )
};


export default MainListItems;