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
import NewTaskDialog from './NewTaskDialog';
import auth from '../utils/auth';
import axios from 'axios';

function handleFilter(arr1,arr2,type){
    arr1.forEach(function(e){
                if(e.tasktype === type) 
                    arr2.push(e) 
            });
}

class HomePage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userName:auth.getUserDetails(),
            todoList:[],
            inProgressList:[],
            completedList:[],
            Cardtypes:CardTypes,
            isModalOpen:false
        }
        // console.log('Hello' + ' ' + this.state.userName)
        // load all existing tasks
        axios.post('http://localhost:4000/api/getAllTasks',{userName:this.state.userName})
            .then(res=>{
                //console.log("First Data Load" + ' ' + JSON.stringify(res.data.data))
                const copy = this.state
                var todoList=[]
                var inProgressList=[]
                var completedList=[]
                handleFilter(res.data.data,todoList,this.state.Cardtypes.TODO)
                copy["todoList"]=todoList
                handleFilter(res.data.data,inProgressList,this.state.Cardtypes.INPROGRESS)
                copy["inProgressList"]=inProgressList
                handleFilter(res.data.data,completedList,this.state.Cardtypes.COMPLETED)
                copy["completedList"]=completedList
                this.setState({...copy})
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    // Move Todo task to the InProgress list
    StartTodoTask(data){
        // Add task to the InProgress List
        const newitem=data
        this.setState({inProgressList:[...this.state.inProgressList,newitem]})

        // Remove task from existing Todo List
        const newList=this.state.todoList.filter(task => task.taskid!==data.taskid)
        this.setState({todoList:newList})

        // Save in database
        axios.post("http://localhost:4000/api/updateTask",{userName:this.state.userName,taskid:data.taskid,taskType:this.state.Cardtypes.INPROGRESS})
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    CompleteTask(data){
        // Add task to the InProgress List
        const newitem=data
        this.setState({completedList:[...this.state.completedList,newitem]})

        // Remove task from existing Todo List
        const newList=this.state.inProgressList.filter(task => task.taskid!==data.taskid)
        this.setState({inProgressList:newList})

        // Save in database
        axios.post("http://localhost:4000/api/updateTask",{userName:this.state.userName,taskid:data.taskid,taskType:this.state.Cardtypes.COMPLETED})
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    addTask(data){
        return new Promise(function(resolve,reject){
            axios.post('http://localhost:4000/api/task',data)
            .then(res=>{
                // get task id of the task created
                console.log(res.data.data)
                return resolve(res.data.data)
            })
            .catch(err=>{
                console.log(err.response)
                return reject(err.response)
            })
        })
    }

    async CreateNewTask(data){
        // Add task to the InProgress List
        data["userName"]=this.state.userName
        data["taskType"]=this.state.Cardtypes.TODO
        console.log("New Task" + JSON.stringify(data))

        // wait for task to fetch id first
        var newitem=data
        try{
            newitem["taskid"]= await this.addTask(data)
        }catch(error){
            console.error(error)
        }

        this.setState({todoList:[...this.state.todoList,newitem]})
        console.log(this.state)
    }

    OpenModal(){
        this.setState({isModalOpen:true})
    }

    CloseModal(){
        this.setState({isModalOpen:false})
    }

    logoutHandler(){
        auth.logout(()=>{
            this.props.history.push('/')
        })
    }


    render(){
        return(
            <div>
                <PrimarySearchAppBar dialogOpenHandler={this.OpenModal.bind(this)} handleLogout={this.logoutHandler.bind(this)}/>
                <Grid container spacing={1}>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><FileCopyIcon style={{marginRight:'0.5rem'}}/>To do</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.todoList.map((e)=> <SimpleCard key={e.taskid} data={e} cardtype={this.state.Cardtypes.TODO} clickHandler={this.StartTodoTask.bind(this,e)}></SimpleCard>)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><BuildIcon style={{marginRight:'0.5rem'}}/>In Progress</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.inProgressList.map((e)=> <SimpleCard key={e.taskid} data={e} cardtype={this.state.Cardtypes.INPROGRESS} clickHandler={this.CompleteTask.bind(this,e)}></SimpleCard>)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography style={{fontSize:'1.8rem'}} variant='h4'><CheckCircleIcon style={{marginRight:'0.5rem'}}/>Completed</Typography>
                        </div>
                        <div className='list-container'>
                            {this.state.completedList.map((e)=> <SimpleCard key={e.taskid} data={e} cardtype={this.state.Cardtypes.COMPLETED}></SimpleCard>)}
                        </div>
                    </Grid>
                <NewTaskDialog isModalOpen={this.state.isModalOpen} dialogCloseHandler={this.CloseModal.bind(this)} createTaskHandler={this.CreateNewTask.bind(this)}/>
                </Grid>
            </div>
        );
    }
    
}

export default HomePage;