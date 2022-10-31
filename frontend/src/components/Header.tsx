import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import { clear } from "../services/token";

const navItems = ["Home", "Login", "Create Patient"];

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("cleared");
    clear();
    window.location.href = "/login";
  };
  return (
    // <Box >
    <AppBar component="nav" sx={{ display: "flex" }} position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Patient Profiles Management
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link to="/" style={{ color: "white", padding: "2px" }}>
            Home
          </Link>
          <Link to="/login" style={{ color: "white", padding: "2px" }}>
            Login
          </Link>
          <Link to="/create" style={{ color: "white", padding: "2px" }}>
            Create Patient
          </Link>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar src="" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
        {/* </div> */}
      </Toolbar>
    </AppBar>
    // </Box>
  );
};
