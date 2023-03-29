import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { HomeToolbar, HomeTable } from './components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  list,
  save,
  update,
  remove,
  resetErrors
} from '../../store/Home'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  grid: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
}));

const Home = (props) => {
  const classes = useStyles()

  useEffect(() => {
    props.list()
  }, [])

  return (
    <div>
      <Snackbar open={props.err}
                anchorOrigin={{vertical: 'center', horizontal: 'top'}}
                autoHideDuration={3000}
                onClose={props.resetErrors}
      >
        <Alert onClose={props.resetErrors} severity="error">
          {props.err}
        </Alert>
      </Snackbar>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          item
        >
          <HomeToolbar saveAction={props.save} listAction={props.list} />
        </Grid>
        <Grid
          item
        >
          <div >
            <HomeTable records={props.records} meta={props.meta} listAction={props.list} updateAction={props.update} removeAction={props.remove} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  records: state.home.records,
  err: state.home.err,
  meta: state.home.meta
})

const mapDispatchToProps = dispatch => bindActionCreators({
  list,
  save,
  update,
  remove,
  resetErrors
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
