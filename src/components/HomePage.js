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
import Testdata from '../utils/test';

// Render each task in a specific category
function RenderTasks(CardData,Cardtype) {

    let result=CardData.map((e)=>{
        return <SimpleCard key={e.indexNo} data={e} cardtype={Cardtype}></SimpleCard>;
    })
    return result
}


class HomePage extends React.Component{

    constructor(){
        super()
        this.state={
            data:Testdata,
            Cardtypes:CardTypes
        }
    }

    render(){
        return(
            <div>
                <PrimarySearchAppBar/>
                <Grid container spacing={1}>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography variant='h4'><FileCopyIcon/>To do</Typography>
                        </div>
                        <div className='list-container'>
                            {RenderTasks(this.state.data[0],this.state.Cardtypes.TODO)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography variant='h4'><BuildIcon/>In Progress</Typography>
                        </div>
                        <div className='list-container'>
                            {RenderTasks(this.state.data[1],this.state.Cardtypes.INPROGRESS)}
                        </div>
                    </Grid>
                    <Grid item sm xs={12}>
                        <div className='list-title'>
                            <Typography variant='h4'><CheckCircleIcon/>Completed</Typography>
                        </div>
                        <div className='list-container'>
                            {RenderTasks(this.state.data[2],this.state.Cardtypes.COMPLETED)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
    
}

export default HomePage;