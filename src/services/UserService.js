import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1.0/shopping';
class UserService {

	saveUser(user) {
		return axios.post(baseUrl + '/register', user);
	}
	getLogin(loginId) {

		return axios.get(baseUrl + '/login/'+loginId);
	}
	getLogout(loginId) {

		return axios.get(baseUrl + '/logout/' + loginId);
	}	
	forgetPassword(username) {
		return axios.put(baseUrl + '/' + username + '/forgot');
	}
	resetPassword(resetPwd) {
		return axios.post(baseUrl + '/password/reset', resetPwd);
	}
}
export default new UserService()