import React,{Component} from 'react';

class Card extends Component{
    render(){
        return(
            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.props.addTask}>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                            type="text"
                                            placeholder="Title"
                                            name="title"
                                            onChange={this.props.handleChange}
                                            value={this.props.title}></input>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <textarea
                                            placeholder="Description"
                                            className="materialize-textarea"
                                            name="description"
                                            onChange={this.props.handleChange}
                                            value={this.props.description}
                                            ></textarea>
                                        </div>
                                        </div>
                                        <button type="submit" className= "btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
        )
    }
}

export default Card;