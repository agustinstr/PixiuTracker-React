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
import axiosInstance from '../axios';
import CoinChart from './CoinChart';
import Header from './Header';
import MainListItems from './MainListItems';
import Title from './Title';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


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
    height: '1000vh',
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
    height: 600,
  },
}));



export default function TotalBalances() {
  const [coinChartData, setCoinChartData] = useState([])
  const [coins, setCoins] = useState([])
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let intervalID
  useEffect(() => {
    intervalID = setInterval(updateCoins,250000);
  })

  function updateCoins(){
    axiosInstance
      .get('user/snapshots', {})
      .then((res) => {
        console.log(res)
      })
      .catch((e) =>
        clearInterval(intervalID)
      );
  }
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (e) =>{
    axiosInstance
    .get('user/coin-history' + "?coinName=" + e.target.value, {})
    .then((res) => {
        setCoinChartData(res.data.map((i) => { return {"period": i.snapshot, "price": i.price}}))
    })
    .catch((e) =>
        console.log("There was a problem" + e)
    );
    console.log(e.target.value)
   }

  useEffect(() => {
    axiosInstance
    .get('user/portfolio', {})
    .then((res) => {
        setCoins(res.data.map((i) => { return  (<option>{i.name}</option>)}))
    })
    .catch((e) =>
        console.log("There was a problem" + e)
    );
  }, [])

  useEffect(() => {
    axiosInstance
    .get('user/coin-history', {})
    .then((res) => {
        setCoinChartData(res.data.map((i) => { return {"period": i.snapshot, "price": i.price}}))
    })
    .catch((e) =>
        console.log("There was a problem" + e)
    );
  }, [])

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
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}> 
                <Title>Price Chart</Title>
                <br/>
                <InputLabel htmlFor="grouped-native-select">Select Coin</InputLabel>
                <Select native defaultValue="" id="grouped-native-select" onChange={handleChange}>
                    <option value="" />
                    {coins}
                </Select>
                <br/>
                <CoinChart data = {coinChartData}/>
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