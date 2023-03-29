import React, { useState } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
 } from '@material-ui/pickers';
import CallReceivedRoundedIcon from '@material-ui/icons/CallReceivedRounded';
import CallMadeRoundedIcon from '@material-ui/icons/CallMadeRounded';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 100
  },
  root: {
    marginTop: theme.spacing(7),
  }
}));

const HomeToolbar = (props) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [validFormState, setValidFormState] = useState(true)

  const handleDateChange = date => {
    setSelectedDate(date)

    if (date == 'Invalid Date') {
      setValidFormState(false)
      return
    }

    setValidFormState(true)
  }

  const submit = (type) => {
    const event = {
      clockin_record: {
        register_type: type,
        register_date: selectedDate
      }
    }

    props.saveAction(event)
    props.listAction()
  }

  return (
    <>
      <Grid container className={classes.root} alignItems="center" justify="center" direction="column">
        <Grid item xs={5}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Pick date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                variant="inline"
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                maxDate={new Date()}
              />
              <KeyboardTimePicker
                className={classes.label}
                margin="normal"
                id="time-picker"
                label="Pick time"
                value={selectedDate}
                onChange={handleDateChange}
                variant="inline"
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={5}>
          <Button onClick={() => { submit('in')} } disabled={!validFormState || selectedDate > new Date()} startIcon={<CallReceivedRoundedIcon />} variant="contained" color="primary" size='large' minWidth="5px">Clock In </Button>
          <Button onClick={() => { submit('out')} } disabled={!validFormState || selectedDate > new Date()} startIcon={<CallMadeRoundedIcon />} variant="contained" color="white" size='large'>Clock Out</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default HomeToolbar
