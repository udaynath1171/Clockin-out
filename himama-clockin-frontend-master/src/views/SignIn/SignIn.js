import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Box
} from '@material-ui/core';
import validate from 'validate.js';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, resetLoginAttempt } from '../../store/SignIn'
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'url(/images/wave.svg)',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%'
  },
  grid: {
    height: '100%'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    direction: 'row'
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 125,
    paddingTop: 90,
    flexBasis: 700
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  image: {
    textAlign: 'center'
  },
  loginForm: {
    borderRadius: '2%',
    border: 0,
    backgroundColor: 'white',
    width: 450
  }
}));

const SignIn = (props) => {
  const { history } = props;

  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const handleChange = event => {
    event.persist()

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
  }

  const handleSignIn = event => {
    setLoading(true)
    event.preventDefault();
    props.login(formState.values)
  }

  useEffect(() => {
    if (props.err === false) {
      history.push('/home')
    }

    if (props.err !== null) {
      setLoading(false)
    }
  }, [props.err])

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          item
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <Box
                className={classes.loginForm}
                boxShadow={2}
              >
                <form
                  className={classes.form}
                  onSubmit={handleSignIn}
                >
                  <div className={classes.image}>
                    <img
                      alt="Logo"
                      src="/images/logo_header.png"
                    />
                  </div>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Log In
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password[0] : null
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid || loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                  {
                    loading ? <CircularProgress size={26} /> :
                    'Log in now'
                  }
                  </Button>
                </form>
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={props.err}
                autoHideDuration={6000}
                onClose={props.resetLoginAttempt}
      >
        <Alert onClose={props.resetLoginAttempt} severity="error">
          User and/or password invalid.
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => ({
  err: state.signIn.err
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  resetLoginAttempt
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
