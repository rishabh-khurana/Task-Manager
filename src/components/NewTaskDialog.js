import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import 'date-fns';

export default function NewTaskDialog(props) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);event.target.value
//   };

  const [task, setTask] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [value, setValue] = React.useState('High');

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T18:30:00'));

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSetDescription = (event) => {
    setDesc(event.target.value);
  };

  const handleSetTask = (event) => {
    setTask(event.target.value);
  };

  const taskCreate = () => {
    // create object
    const taskObj={
        taskName:task,
        taskdesc:desc,
        timeOfRegister:selectedDate,
        importance:value
    }
    // send all values to parent
    props.createTaskHandler(taskObj);
    // close the dialog
    props.dialogCloseHandler();
  }

  return (
    <div>
      <Dialog open={props.isModalOpen} onClose={props.dialogCloseHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the task that is to be added to your todo list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="task-name"
            label="Task Name"
            type="email"
            fullWidth
            onBlur={handleSetTask}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Description"
            type="email"
            fullWidth
            onBlur={handleSetDescription}
          />
          <DialogContentText style={{paddingTop:"2rem"}}>
            Task Importance Level (High/Low)
          </DialogContentText>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="High" control={<Radio />} label="High" />
          <FormControlLabel value="Low" control={<Radio />} label="Low" />
        </RadioGroup>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Task End Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            />
            <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Task End Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.dialogCloseHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={taskCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
