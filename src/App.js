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
import {StoreContext} from './context/index';

const drawerWidth = 240;

export default function App(props) {

  React.useEffect(() => {
    abc()
    },[]);
    
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const {store} = React.useContext(StoreContext);

  const abc = async () => {
    const user = await store.getProfile();
    setUser(user);
  };



  console.log("ooooo",user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar ><p className="textCenter">Credit Suisse</p></Toolbar>
      <Divider />
      <List>
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

  const container = window !== undefined ? () => window().document.body : undefined;

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
            <Typography variant="h6" noWrap component="div">
              SBT
            </Typography>
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
