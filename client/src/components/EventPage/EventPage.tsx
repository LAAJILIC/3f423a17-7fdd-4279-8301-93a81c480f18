import React, { useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Event } from '../../types/Event'
import { Helmet } from 'react-helmet-async'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './EventPage.css'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createRow( place: string, desc: string | undefined) {
  return { place, desc };
}
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: '30px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function EventPage() {
const [value, setValue] = React.useState(0);
const url = window.location.pathname;
const specificUrl = url.slice(7);
const [data, setData] = useState<Event>();
const eventUrl = `http://localhost:5000/api/event/${specificUrl}`;
console.log(eventUrl)

useEffect(() => {
  const fetchEvent = () => {
    return fetch(eventUrl) 
    .then((response) => response.json())
    .then((data) => setData(data));
    // .catch((error) => console.error('Error fetching data:', error));
  }
  console.log(data);
  fetchEvent();
}, []);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

const rows = [
  createRow('Country', data?.country),
  createRow('City', data?.city),
  createRow('Venue', data?.venue.name),
];
  return (
   <div>
      <Helmet>
        <title>Event Page</title>
      </Helmet>
      {
        data ? ( 
          <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 720, mt:'2%' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 5, borderColor: 'divider' }}
          >
            <Tab label="Title" {...a11yProps(0)} sx={{ height: 180 }} />
            <Tab label="Flyer" {...a11yProps(1)} sx={{ height: 180 }} />
            <Tab label="Date" {...a11yProps(2)} sx={{ height: 180 }} />
            <Tab label="Place" {...a11yProps(3)} sx={{ height: 180 }} />
          </Tabs>

          <TabPanel value={value} index={0}>
          <Box sx={{ display: 'blocks',
            alignItems:'center', mt: 10, ml: 50, maxWidth: '100%'}}>
            <Typography variant="h5" gutterBottom color={blue}>
          {data.title}
            </Typography>
            The artists are :
      { [darkTheme].map((theme, index) => (
        <Grid item sm={20} md={40} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.grey',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              {data.artists.map((artiste) => (
                <Item key={index}>
              {artiste.name}            
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
         </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ display: 'blocks',
            alignItems:'center', ml: 30, maxWidth: '100%' }}>
 <img className='img'
          src={data.flyerFront}
          alt={data.title}/>        
            </Box>
            </TabPanel>
          <TabPanel value={value} index={2}>
          <List
      sx={{
        width: '150%',
        mt: 20, ml: 40,
        bgcolor: 'background.paper',
      }}
    >
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display='flex'
          variant="caption"
        >
          Date
        </Typography>
      </li>
      <ListItem>
        <ListItemText primary=" The event will take place on" secondary={data.date.slice(0,10)} />
      </ListItem>
      <Divider component="li" variant="inset" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 9 }}
          color="text.secondary"
          display="flex"
          variant="caption"
        >
        Days / Duration
        </Typography>
      </li>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessTimeFilledIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Start Day" secondary={data.startTime.slice(0,10)} />
        <ListItemText primary="Start Time" secondary={data.startTime.slice(11,16)}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessTimeFilledIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="End Day" secondary={data.endTime.slice(0,10)} />
        <ListItemText primary="End Time" secondary={data.endTime.slice(11,16)}/>
      </ListItem>
    </List>
    </TabPanel>
          <TabPanel value={value} index={3}>
          <TableContainer component={Paper} sx={{ ml: 30, mt: 10 }}>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Location
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>where?</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.place}>
              <TableCell>{row.place}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          <Button variant="contained" sx={{ display: 'right', mt: 15, ml: 50 }}onClick={() => window.open(data.venue.direction)}>Discover The live location</Button>
           </TabPanel>
        </Box>
        ) : null
      }
    </div>
  )}
export default EventPage





