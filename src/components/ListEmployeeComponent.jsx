import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
   constructor(props){
        super(props)
        this.state ={
            employess : []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

   componentDidMount(){
       EmployeeService.getEmployees().then((res) =>{
            this.setState({employess : res.data});   
       });
   }   

   addEmployee(){
       this.props.history.push('/add-employee/_add');
   }
 
   editEmployee(id){
    this.props.history.push(`/add-employee/${id}`); 
   }
   viewEmployee(id){
    this.props.history.push(`/view-employee/${id}`);
    }
   deleteEmployee(id){
       //rest api
    //this.props.history.push(`/add-employee/${id}`); 
    EmployeeService.deleteEmployee(id).then(res => {
        this.setState({employess: this.state.employess.filter(employee => employee.id !== id)});
    });
}
    render() {
        return (
            <div>
                <h2 className="text-center">Employee List</h2>
                    <div className="row">
                        <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                    </div>
                    <div className="row">
                    <table className = "table table-striped table-bordered">

                        <thead>

                            <tr>

                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.employess.map(
                                    employee => 
                                    <tr key = {employee.id}>
                                          <td>{employee.firstName}</td>
                                          <td>{employee.lastName}</td>
                                          <td>{employee.emailId}</td>
                                          <td>
                                              <button onClick={() => this.editEmployee(employee.id)} className='btn btn-primary'>Update</button>
                                          </td>
                                          <td>
                                              <button onClick={() => this.deleteEmployee(employee.id)} style={{marginLeft: "10px"}} className='btn btn-danger'>Delete</button>
                                          </td>
                                          <td>
                                              <button onClick={() => this.viewEmployee(employee.id)} style={{marginLeft: "10px"}} className='btn btn-info'>View</button>
                                          </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;