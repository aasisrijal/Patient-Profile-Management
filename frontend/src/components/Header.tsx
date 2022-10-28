import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import { clear } from "../services/token";

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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Patient Profiles Management</Typography>
        <div className="navlinks">
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
          <Link to="/create" style={{ color: "white" }}>
            Create Patient
          </Link>
        </div>
        <div>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};
