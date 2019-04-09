import React, {Component} from 'react';

class Task extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.tasks.map(task =>{
                        return(
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <button
                                    className="btn light-green darken-4"
                                    onClick={()=>{
                                        this.props.editTask(task._id);
                                    }
                                    }
                                    ><i className="material-icons">edit</i></button>
                                    <button
                                    className="btn light-red darken-4"
                                    style={{margin:'4px'}}
                                    onClick={()=>{
                                        this.props.deleteTask(task._id);
                                    }}><i className="material-icons">delete</i></button>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        )
    }
}

export default Task;