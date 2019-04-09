import React, {Component} from 'react';
import Task from './Task';
import Card from './Card';

class App extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description:'',
            tasks:[],
            _id:''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
    }

    componentDidMount(){
        this.fetchTasks();
    }

    handleChange(inp){
        const {name, value} = inp.target;
        this.setState({
            [name]: value
        });
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data=>{
            this.setState({
                tasks:data
            });
        });
    }

    addTask(frm){
        frm.preventDefault();
        if(this.state._id){
            fetch('/api/tasks/'+this.state._id,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                M.toast({html:'Task Updated'});
                this.setState({title:'',description:'',_id:''});
                this.fetchTasks();
            })
        }else{
            fetch('/api/tasks',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res =>res.json())
            .then(data=> {
                console.log(data);
                M.toast({html:'Task Saved'});
                this.setState({title:'',description:''});
                this.fetchTasks();
            })
            .catch(err=>console.log(err));
        }
    }

    

    deleteTask(id){
    if(window.confirm('Are you sure you want to delete it?')){
        fetch('/api/tasks/' + id,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            M.toast({html: 'Task Deleted'});
            this.fetchTasks();
    });
    }
    }

    editTask(id){
        fetch('/api/tasks/'+id)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                title:data.title,
                description:data.description,
                _id:data._id
            })
        });
    }

    render(){
        return(
            //Navigation
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Task Board</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                        {/* Component Card */}
                            <Card
                            title={this.state.title} //Send title value saved in state.
                            description={this.state.description} //Send description value saved in state.
                            addTask={this.addTask} //Send addTask function to component.
                            handleChange={this.handleChange} //Send handleChange function to component.
                            />
                        </div>

                        <div className="col s7">
                        {/* Component Task */}
                            <Task
                             tasks={this.state.tasks} //Send tasks saved in state.
                             editTask={this.editTask}   //Send editTask function to component.
                             deleteTask={this.deleteTask} //Send deleteTask function to component.
                             />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;