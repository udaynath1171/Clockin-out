import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { withRouter } from 'react-router-dom'
import { logout } from '../../../../store/SignIn'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [user, setUser] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('logged_user') ? JSON.parse(localStorage.getItem('logged_user')) : null
    if (data === null) return
    setUser(data.user.data.attributes)
  }, [])

  const logout = () => {
    props.logout()
    props.history.push('/login')
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="white"
    >
      <Toolbar>
        <RouterLink to="/home">
          <img
            alt="Logo"
            src="/images/logo_header.png"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Typography
          variant="h2"
        >
          {user.name}
        </Typography>
        <IconButton
          onClick={() => logout()}
          className={classes.signOutButton}
          color="inherit"
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch)

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(Topbar)
