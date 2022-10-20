import axios from 'axios';
const baseUrl='http://localhost:8081/api/v1.0/shopping';
class UserService{
	
	saveUser(user){
		return axios.post(baseUrl+'/register',user);
	}
getLogin(loginId) {

	return axios.get(baseUrl+'/login');
}
  getUser(){
	return axios.get(baseUrl+'/users/all');
   }
   getUserSearch(username){
	return axios.get(baseUrl+'/user/search/'+username);
   }
   forgetPassword(username,newPassword){
  	let loginId=localStorage.getItem('loginId');
		return axios.put(baseUrl+'/'+username+'/forgetPassword/'+newPassword);
	}
	
}
export default new UserService()