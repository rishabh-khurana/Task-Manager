import React from 'react';
import './HomePage.css';
import PrimarySearchAppBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import SimpleCard from './Task';
import CardTypes from '../utils/flags';



class HomePage extends React.Component{

    constructor(){
        super()
        this.state={
            todoList:[
                {
                    taskName:"Unique Task One",
                    taskdesc:"This is the first task which in Todo",
                    timeOfRegister:"20/11/2019",
                    importance:"High"
                },
                {
                    taskName:"Unique Task Two",
                    taskdesc:"This is the second task which in Todo",
                    timeOfRegister:"21/11/2019",
                    importance:"Low"
                }
            ],
            inProgressList:[
                {
                    taskName:"Unique Task Three",
                    taskdesc:"This is the first task which in Progress",
                    timeOfRegister:"20/11/2019",
                    importance:"High"
                }
            ],
            completedList:[
                {
                    taskName:"Unique Task Four",
                    taskdesc:"This is the first task which complete",
                    timeOfRegister:"20/11/2019",
                    importance:"High"
                }
            ],
            Cardtypes:CardTypes
        }
    }

    // Move Todo task to the InProgress list
    StartTodoTask(data){
        // Add task to the InProgress List
        const newitem=data
        this.setState({inProgressList:[...this.state.inProgressList,newitem]})

        // Remove task from existing Todo List
        const newList=this.state.todoList.filter(task => task.taskName!==data.taskName)
        this.setState({todoList:newList})

        // Save in database
    }

    CompleteTask(data){
        // Add task to the InProgress List
        const newitem=data
        this.setState({completedList:[...this.state.completedList,newitem]})

        // Remove task from existing Todo List
        const newList=this.state.inProgressList.filter(task => task.taskName!==data.taskName)
        this.setState({inProgressList:newList})

        // Save in database
    }

   


    render(){
        return(
            <div>
                <PrimarySearchAppBar/>
                <Grid container spacing={1}>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><FileCopyIcon style={{marginRight:'0.5rem'}}/>To do</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.todoList.map((e)=> <SimpleCard key={e.taskName} data={e} cardtype={this.state.Cardtypes.TODO} clickHandler={this.StartTodoTask.bind(this,e)}></SimpleCard>)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><BuildIcon style={{marginRight:'0.5rem'}}/>In Progress</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.inProgressList.map((e)=> <SimpleCard key={e.taskName} data={e} cardtype={this.state.Cardtypes.INPROGRESS} clickHandler={this.CompleteTask.bind(this,e)}></SimpleCard>)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><CheckCircleIcon style={{marginRight:'0.5rem'}}/>Completed</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.completedList.map((e)=> <SimpleCard key={e.taskName} data={e} cardtype={this.state.Cardtypes.COMPLETED} clickHandler={this.StartTodoTask}></SimpleCard>)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
    
}

export default HomePage;