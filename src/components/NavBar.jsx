import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { candidateNavLists, recruiterNavLists, userDropdown } from "../constants";
import { logo } from "../utils";
import routes from "../routes/routeConfig";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [usedNavLists, setUsedNavLists] = useState(candidateNavLists);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (user?.sub?.role === "recruiter") {
      setUsedNavLists(recruiterNavLists);
    } else {
      setUsedNavLists(candidateNavLists);
    }
  }, [user]);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    showAlert({
      message: "Logout successful",
      type: "success",
    });
    if ( user.sub.role === "recruiter" ) {
      navigate(routes.login_recruiter);
    } else {
      navigate(routes.login_candidate);
    }
  };

  const handleBackToHome = () => {
    navigate(routes.home);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#10a1fc", color: "white", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {usedNavLists.map((category) => (
                <MenuItem 
                  key={category.id} 
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(category.link);
                  }}
                >
                  <Typography textAlign="center" sx={{ color: "#052b4c" }}>
                    {category.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img 
            src={logo} 
            alt="" 
            width="50" 
            className="cursor-pointer" 
            onClick={handleBackToHome} 
            style={{ display: "flex", marginRight: "8px" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            S-REC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {usedNavLists.map((category) => (
              <Button
                key={category.id}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(category.link);
                }}
                sx={{
                  my: 2,
                  mx: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {category.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ backgroundColor: "white" }}>
                  <p className="font-bold text-primary500 text-xl text-center">
                    {user?.sub?.full_name?.[0] || ""}
                  </p>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userDropdown.map((category) => (
                <MenuItem 
                  key={category.id} 
                  onClick={() => {
                    handleCloseUserMenu();
                    if (category.title === "Logout") {
                      handleLogout();
                    } else if (category.link) {
                      navigate(category.link);
                    }
                  }}
                >
                  <Typography textAlign="center" color="#052b4c">
                    {category.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;