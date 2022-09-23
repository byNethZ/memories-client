import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useStyles from "./style";
import jwt_decode from 'jwt-decode';
import memories from "./../../images/memories-Logo.png";
import memoriesText from "./../../images/memories-Text.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    
    navigate('/');

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = jwt_decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
  return (
    <AppBar className={classes.appBar} position="static">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="40px"
          />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.userObj ? user.userObj.name : user.result.name} src={user.userObj ? user.userObj.picture : user.result.picture} >{user.userObj ? user.userObj.name.charAt(0) : user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.userObj ? user.userObj.name : user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ):(
          <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
