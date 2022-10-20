import React, { Component } from 'react'
import HeaderComponent from './HeaderComponent';
import './Style.css'
import UserService from '../services/UserService';
import { useHistory } from 'react-router-dom';


class Registration extends React.Component {

    
    constructor(props) {
        super(props)

        this.state = {
            
            users:{},
            error:'',
            message:''


        }

    }
handleChange(user,e){
    let users=this.state.users;
    users[user]=e.target.value;
    this.setState({users});
    console.log(users[user]);
}


handelValidation(){
    let users=this.state.users;
    let validate=true;
    console.log(users.loginId);
    if(!users["loginId"] && !users["firstName"] && !users["lastName"] && !users["email"] && !users["dob"] && !users["password"] && !users["contactNumber"]){
this.setState({error:"Please enter all field"});
        validate=false;
    }
    else{
         if(users["password"]!=users["confirmPassword"]){
            this.setState({error:"Please enter password and confirmPassword same"});
        validate=false;
        }
        else{
        validate=true;
        }}
        return validate;

}

    
    cancel=(e)=>{
        e.preventDefault();
        this.props.history.push('/registration');
    }
    login=(e)=>{
        e.preventDefault();
        this.props.history.push('/');
    }
    saveUserDetails=(e)=>{
        e.preventDefault();
if(this.handelValidation()){
let users=this.state.users;
UserService.saveUser(users).then(response => {
   this.setState({message: "Registered successfully"})})
    .catch(err => { 
        let error=err.message;
        if(error=="Request failed with status code 500"){
   this.setState({error:"Login Id and Email Already Exist"});
    } })
}
}
   
    render() {
        return (
            <div>
            <HeaderComponent/>
            <div>
            <div className = "registration">
            <h2 className="centerregist">Registration</h2>
                                    <form>
                                    <div className = "form-group">
                                            <input  placeholder="Login Id" name="loginId" className="form-control"  
                                                value={this.state.users["loginId"]} onChange={this.handleChange.bind(this,"loginId")}/>
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.users["firstName"]} onChange={this.handleChange.bind(this,"firstName")}
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.users["lastName"]} onChange={this.handleChange.bind(this,"lastName")}
                                                />
                                        </div>
                                         <div className = "form-group">
                                            <input placeholder="Contact Number" name="contactNumber" className="form-control" 
                                            value={this.state.users["contactNumber"]} onChange={this.handleChange.bind(this,"contactNumber")}
                                               />
                                        </div>
                                         <div className = "form-group">
                                            <input type="date" placeholder="Date of Birth" name="dob" className="form-control" 
                                            value={this.state.users["dob"]} onChange={this.handleChange.bind(this,"dob")}
                                                />
                                       </div>

                                        <div className = "form-group">
                                            <input placeholder="Email Id" name="email" className="form-control"
                                            value={this.state.users["email"]} onChange={this.handleChange.bind(this,"email")} 
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input type="password" placeholder="Password" name="password" className="form-control" 
                                            value={this.state.users["password"]} onChange={this.handleChange.bind(this,"password")}
                                               />
                                        </div>
                                         <div className = "form-group">
                                            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="form-control" 
                                            value={this.state.users["confirmPassword"]} onChange={this.handleChange.bind(this,"confirmPassword")}
                                                />
                                        </div>
                                         <div className = "form-group">
                                        <span className="error">{this.state.error}</span>
                                        <span className="message">{this.state.message}</span>
                                         </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-success" onClick={this.saveUserDetails.bind(this)}>Save</button>
                                        <button className="btn btn-danger" onClick= {this.cancel.bind()}  style={{marginLeft: "10px"}} >Cancel</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span> <a href='' onClick={this.login.bind()}>Already registered?LOGIN</a></span>
                                       
                                         </form>
                                </div>
            </div>
            </div>
        )
    }
}

export default Registration
