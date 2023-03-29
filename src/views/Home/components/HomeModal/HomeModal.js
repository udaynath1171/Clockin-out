import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
 } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    padding: theme.spacing(2, 4, 3),
  },
  grid: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const HomeModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [type, setType] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
    if (props.event) {
      setType(props.event.register_type)
      setDate(props.event.register_date)
    }
  }, [props.event])

  const handleClose = () => {
    props.setOpen(false);
  }

  const handleDateChange = date => {
    setDate(date)
  }

  const submit = () => {
    props.updateAction({
      clockin_record: {
        register_type: type,
        register_date: date
      }
    }, props.event.id)
    handleClose()
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={() => { handleClose() }}
    >
      <div style={modalStyle} className={classes.paper}>
        { props.event ?
          <Grid
            className={classes.grid}
            container
          >
            <Grid
              item
              lg={12}
            >
              <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={e => { setType(e.target.value) }}
                >
                  <MenuItem value={'in'}>In</MenuItem>
                  <MenuItem value={'out'}>Out</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              lg={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Pick date"
                  format="MM/dd/yyyy"
                  value={date}
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
                  value={date}
                  onChange={handleDateChange}
                  variant="inline"
                  inputVariant="outlined"
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              lg={12}
            >
            <Button onClick={() => { submit()} } variant="contained" color="primary" size='large' minWidth="5px">Update</Button>
            </Grid>
          </Grid> : <></>
        }
      </div>
    </Modal>
  )
}

export default HomeModal
