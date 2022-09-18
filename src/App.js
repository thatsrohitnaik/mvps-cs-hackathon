import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyAllocation from './pages/myAllocations';
import MyQuota from './pages/myQuota';
import MyApproval from './pages/myApproval';
import MyTeam from './pages/myTeam';
import MyRequest from './pages/myRequest';
import MyHome from './pages/myHome';
import Default from './pages/default';
import { StoreContext } from './context/index';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const drawerWidth = 240;


export default function App(props) {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [office, setOffice] = React.useState('PN-E2');

  const handleChangeOffice = (event) => {
    setOffice(event.target.value);
  };
  React.useEffect(() => {
    abc()
  }, []);
  const isMobile = window.innerWidth > 800 ? true : false;

  const { windowP } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const { store } = React.useContext(StoreContext);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const abc = async () => {
    const user = await store.getProfile();
    setUser(user);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar ><p className="textCenter">Credit Suisse</p></Toolbar>
      <Divider />
      <br />
      <List>
        <ListItem>   <FormControl sx={{ m: 0, width: '100%' }} size="small">
          <InputLabel id="demo-select-small">Office</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={office}
            label="office"
            onChange={handleChangeOffice}
          >
            <MenuItem value="PN-E2">Pune Eon 2</MenuItem>
            <MenuItem disabled value="PN-E1">Pune Eon 1</MenuItem>
            <MenuItem disabled value="ZU-A1">Zuric A</MenuItem>
          </Select>
        </FormControl>  <br/><br/>   </ListItem>


        <ListItem>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={0}>
              {isMobile && <DesktopDatePicker
                label="Select Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                sx={{ color: 'red' }}
                onChange={handleChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
              }
              {!isMobile && <MobileDatePicker
                label="Select Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />}
            </Stack>
          </LocalizationProvider>
          <br />
        </ListItem>
        {[{ header: 'My Team', path: "/team" }, { header: 'My Quota', path: "/quota" }, { header: 'My Allocation', path: "/allocation" }, { header: 'My Request', path: "/request" }, { header: 'My Approval', path: "/approval" }].map((text, index) => (
          <ListItem key={text.header} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link to={text.path}>
                <ListItemText primary={text.header} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = windowP !== undefined ? () => windowP().document.body : undefined;

  return (
    <BrowserRouter>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >

          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Seat Allocation Tool

            </Typography>
            <div className="abc">
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Routes>
            <Route exact path="/" element={<MyHome />} />
            <Route exact path="/allocation" element={<MyAllocation user={user} />} />
            <Route exact path="/approval" element={<MyApproval />} />
            <Route exact path="/quota" element={<MyQuota />} />
            <Route exact path="/team" element={<MyTeam />} />
            <Route exact path="/request" element={<MyRequest />} />
            <Route path="*" element={<Default />} />
          </Routes>
        </Box>
      </Box >
    </BrowserRouter>
  );
}
