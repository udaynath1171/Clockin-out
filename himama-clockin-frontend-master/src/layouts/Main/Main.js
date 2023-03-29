import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true
      })}
    >
      <Topbar />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
