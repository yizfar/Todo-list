

import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    title: '',
    tasks:[]
  };

componentDidMount = ()=>{
  this.getTask();
};


  getTask= ()=>{
    axios.get('/api')
    .then((response)=>{
      const data =response.data;
      this.setState({tasks: data});
      console.log('data has been recived');
    })
    .catch(()=>{
      alert('error recieving data');
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value      /////in case you have multi form

    });

  };
  submit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title

    };

    axios({
      url: 'http://localhost:3000/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('data has been sent to server');
        this.resetInputs();
      })

      .catch(() => {
        console.log('data has nooooottt been sent to server');
      });

  };
  resetInputs = () => {
    this.setState({
      title:'',
    });
  };

  displayTask = (tasks)=>{
    if (!tasks.length) return null;


   return tasks.map((task, index) => (
      <div key = {index}>
      <h3>{task.title}</h3>
      </div>
    ))
  }

  render() {

    console.log('State: ', this.state);

    return (
      <div className='App'>
        <header>
          <h1 id='heder'> To Do List</h1>
          <form id='form' onSubmit={this.submit} >
            <div className="form-input">
              <input
                type="text"
                name="title"
                placeholder=" write task"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <button>Add task</button>
            </div>

          </form>
        </header>
        <div className="tasks">
            {this.displayTask(this.state.tasks)}

        </div>
      </div>

    );


  }


}
export default App;












