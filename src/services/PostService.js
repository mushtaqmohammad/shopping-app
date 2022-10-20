import axios from 'axios';
const baseUrl='http://localhost:8081/tweets';
//const loginId=localStorage.getItem('loginId');
class PostService{
	
	postTweet(tweet){
		let loginId=localStorage.getItem('loginId');
		return axios.post(baseUrl+'/'+loginId+'/add',tweet);
	}
	saveLike(username,id){
		return axios.put(baseUrl+'/'+username+'/like/'+id);
	}
getAllTweet(){
	return axios.get(baseUrl+'/all');
}
getReplyTweet(tweetMessageId){
return axios.get(baseUrl+'/replyTweet/'+tweetMessageId);
}
saveReplyTweet(reply){
	return axios.post(baseUrl+'/reply',reply);
}
  getUserTweet(){
  	let loginId=localStorage.getItem('loginId');
  	return axios.get(baseUrl+'/'+loginId);

  }
  updateTweet(tweet,id){
  	let loginId=localStorage.getItem('loginId');
		return axios.put(baseUrl+'/'+loginId+'/update/'+id+'/'+tweet);
	}
	resetPassword(oldPassword,newPassword){
  	let loginId=localStorage.getItem('loginId');
		return axios.put(baseUrl+'/'+loginId+'/resetPassword/'+oldPassword+'/'+newPassword);
	}
	deleteTweet(id){
		let loginId=localStorage.getItem('loginId');
		return axios.delete(baseUrl+'/'+loginId+'/delete/'+id);
	}
}
export default new PostService