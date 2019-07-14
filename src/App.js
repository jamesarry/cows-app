import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, Table, ModalFooter, Button } from 'reactstrap';



class App extends Component {
  constructor(){
    super();
    /* Create state to make data dynamic */
    this.state = {
      /* Declare state properties*/
      cows: [],
      newCowData: {
        name: '',
        output: '',
        rating: ''
      },
      editCowData: {
        id: '',
        name: '',
        output: '',
        rating: ''
      },
      newCowModal: false,
      editCowModal: false
   }
 }
    componentWillMount(){
      this._refreshCowData();
  }

    /**modal box to add new cow data*/
    toggleNewCowModal(){
      this.setState({
      newCowModal: ! this.state.newCowModal,
      });
   }

    /**modal box to edit cow data*/
    toggleEditCowModal(){
      this.setState({    
      editCowModal: ! this.state.editCowModal,
      });
   }

    /**Add new cow*/
    addNewCow(){
      /**Making axios post request to add new cows data*/
      axios.post('http://localhost:3000/cows', this.state.newCowData).then((response)=>{
        let {cows} = this.state;
        cows.push(response.data);
        this.setState({cows, newCowModal:false, newCowData:{
          name: '',
          output: '',
          rating: ''
        }});
     });
   }

    /**Update cow data*/
    updateCow(){
      let {name, output, rating} = this.state.editCowData;
      axios.put('http://localhost:3000/cows/' + this.state.editCowData.id, {
          name, output, rating             
      }).then((response)=>{
            this._refreshCowData();
          /**Close modal box after update/edit is complete*/
          this.setState({
            editCowModal: false, editCowData: {id: '', name:'', output:'', rating:''}
          })            
      });
   }

    /**Edit cow data*/
    editCow(id, name, output, rating ){
        this.setState({
        editCowData: {id, name, output, rating}, editCowModal: ! this.state.editCowModal
        });
   }

    /**Delete cow data and refresh/close modal box*/
    deleteCowData(id){
    axios.delete('http://localhost:3000/cows/' + id).then((response) => {
        this._refreshCowData();
    });
  }
      /**Put the get request in a refresh method*/
     _refreshCowData(){
      axios.get('http://localhost:3000/cows').then((response)=>{
        this.setState({
           cows: response.data
        })        
      });
     }

    render(){ 
    let cows = this.state.cows.map((cow)=>{
        return(
      <tr key={cow.id}>
        <td>{cow.id}</td>
        <td>{cow.name}</td>
        <td>{cow.output}</td>
        <td>{cow.rating}</td>
        <td>
          <Button color="success" size="sm" className="mr-2" 
            onClick={this.editCow.bind(this, cow.id, cow.name, cow.output, cow.rating)}>
            Edit
          </Button>

          <Button color="danger" size="sm" 
          onClick={this.deleteCowData.bind(this, cow.id)}>
            Delete
          </Button>
      </td>
      </tr>
        )
    });
    return (
      
    <div className="App container">
      <h1>Fred Farm App</h1>
      <Button className="my-3 addButton" color="primary" 
          onClick={this.toggleNewCowModal.bind(this)}>
          Add Cow
      </Button>
          
      <Modal isOpen={this.state.newCowModal} toggle={this.toggleNewCowModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewCowModal.bind(this)}>
          Add a new cow
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name"
              value={this.state.newCowData.name} onChange={(e)=>{
              /**Get the newCow data*/
              let {newCowData} = this.state;
              /**Set the name property*/ 
              newCowData.name = e.target.value;
              /**Update state to the new value of the input*/
              this.setState({newCowData});
              }} />               
        </FormGroup>
        <FormGroup>               
          <Label for="output">Output</Label>
          <Input id="output" 
            value={this.state.newCowData.output} onChange={(e)=>{                   
            let {newCowData} = this.state;              
            newCowData.output = e.target.value;          
            this.setState({newCowData});
          }} />              
        </FormGroup>
        <FormGroup>                
            <Label for="rating">Rating</Label>
            <Input id="rating"
              value={this.state.newCowData.rating} onChange={(e)=>{
              let {newCowData} = this.state;
              newCowData.rating = e.target.value;
              this.setState({newCowData});
              }} />
        </FormGroup>
        </ModalBody>
        <ModalFooter>
              <Button color="success" 
                onClick={this.addNewCow.bind(this)}>
                  Add 
              </Button>
              <Button color="secondary" 
                onClick={this.toggleNewCowModal.bind(this)}>
                  Cancel
              </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editCowModal} toggle={this.toggleEditCowModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditCowModal.bind(this)}>
          Edit cow
        </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name"
                    value={this.state.editCowData.name} onChange={(e)=>{
                    /**Get the newCow data*/
                    let {editCowData} = this.state;
                    /**Set the name property*/ 
                    editCowData.name = e.target.value;
                    /**Update state to the new value of the input*/
                    this.setState({editCowData});

                  }} />               
            </FormGroup>
            <FormGroup>               
              <Label for="output">Output</Label>
              <Input id="output" 
                    value={this.state.editCowData.output} onChange={(e)=>{                   
                    let {editCowData} = this.state;              
                    editCowData.output = e.target.value;          
                    this.setState({editCowData});
              }} />              
              </FormGroup>
              <FormGroup>                
                <Label for="rating">Rating</Label>
                <Input id="rating"
                      value={this.state.editCowData.rating} onChange={(e)=>{
                      let {editCowData} = this.state;
                      editCowData.rating = e.target.value;
                      this.setState({editCowData});
                }} />
              </FormGroup>
          </ModalBody>
          <ModalFooter>
                <Button color="primary" onClick={this.updateCow.bind(this)}>
                      Update 
                </Button>
                <Button color="secondary" onClick={this.toggleEditCowModal.bind(this)}>
                      Cancel
                </Button>
          </ModalFooter>
        </Modal>


        <Table className="table">
          <thead className="table-head">
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>Output</th>
              <th>rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {cows}
          </tbody> 
        </Table>
        
      </div>
      );
 }
}

export default App;
