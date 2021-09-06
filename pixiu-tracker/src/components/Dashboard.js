import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import Balance from './Balance';
import EnhancedTable from './EnhancedTable';
import Header from './Header';
import CustomPieChart from './PieChart';
import MainListItems from './MainListItems';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        PixiuTracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const portfolioHeaders = [
    { id: "name",numeric: false,disablePadding: true,label: "Name"},
    { id: "amount",numeric: false,disablePadding: true,label: "Amount"},
    { id: "price", numeric: false, disablePadding: false, label: "Price" },
    { id: "value", numeric: true, disablePadding: false, label: "Value" },
    ];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  },
}));

export default function Dashboard() {
  const [usercoins, setusercoins] = useState([])
  const [totalBalance, settotalBalance] = useState(0)
  const [piechartData, setpiechartData] = useState([])
 
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axiosInstance
    .get('user/portfolio', {})
    .then((res) => {
        setusercoins(res.data)
        setpiechartData(res.data.map((i) => { return {"name": i.name, "value": i.value}}))
    })
    .catch((e) =>
        console.log("Alla tiene problemas  dsa" + e)
    );
  }, [])

  useEffect(() => {
      let aux = 0
      usercoins.forEach((e) => {
        aux += e.value
      })
      let n = aux.toFixed(2)
      settotalBalance(n)
  }, [usercoins])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
    <Header/>
    <div className={classes.root}>
      
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >        
        <div className={classes.toolbarIcon}>
        <IconButton 
          onClick={handleDrawerClose}
          className={clsx(!open && classes.menuButtonHidden)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
        </IconButton>  
        </div>
        <Divider />
        <List>
          <MainListItems/>
        </List>
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <CustomPieChart  data={piechartData}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Balance balance ={totalBalance}/>
              </Paper>
            </Grid>
            {/* Coins */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EnhancedTable
                headers ={portfolioHeaders}
                products ={usercoins}
                clickOnCell={ () => null} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
    </React.Fragment>
  );
}