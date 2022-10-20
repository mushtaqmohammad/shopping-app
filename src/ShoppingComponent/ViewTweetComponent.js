import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import PostService from '../services/PostService';
import logo from '../image/download.png';

import { Rating } from 'primereact/rating';
import './TweetStyle.css';
import { Dialog } from 'primereact/dialog';

class ViewTweetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            showReplyTweet:false,
            replyTweets:[],
            reply:{},
            message:'',
            layout: 'list',
            tweetId:'',
            error:''
            
        };
    this.itemTemplate = this.itemTemplate.bind(this);
        
    }
   getReplyTweet(tweetId,tweetMessage){
    PostService.getReplyTweet(tweetId).then(response => this.setState({ replyTweets: response.data}));
    this.setState({showReplyTweet:true});
    this.setState({message:tweetMessage});
     this.setState({tweetId:tweetId});
     this.setState({reply:{}});
     this.setState({error:''});

   }
   saveReplyTweet(){
    this.setState({error:''});
    let reply=this.state.reply;
    if(reply["replyMessage"].length<=144){
    reply["tweetMessageId"]=this.state.tweetId;
    reply["loginId"]=localStorage.getItem('loginId');
    console.log(reply);
    PostService.saveReplyTweet(reply).then(response=>{
        PostService.getReplyTweet(this.state.tweetId).then(response => this.setState({ replyTweets: response.data}));

    });}
else{
    this.setState({error:'Message size is long'});
}
}
    componentDidMount() {
        PostService.getAllTweet().then(response => this.setState({ tweets: response.data}));
    }

    saveLike(username,id){
         PostService.saveLike(username,id).then(response=>{this.componentDidMount()});
    }
    

    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="tweet-list-item">
                    <img src={logo} alt="Logo" />
                    <div className="tweet-list-detail">
                        <div className="tweet-name">@{data.loginId}</div>
                        <div className="tweet-description">{data.tweetMessage}&nbsp;&nbsp;{data.tweetTime}</div>
                        <Button icon="pi pi-comment" onClick={() => this. getReplyTweet(data.id,data.tweetMessage)} ></Button>&nbsp; &nbsp;&nbsp;
                        <Button icon="pi pi-heart" onClick={() => this.saveLike(data.loginId,data.id)} ></Button>&nbsp; &nbsp;{data.likeCount}
                        </div>
                    
                </div>
            </div>
        );
    }
renderFooter() {
        return (
            <div>
                <Button label="Cancel"  onClick={() => this.onHide()} className="p-button-text" />
                <Button label="Reply" onClick={() => this.saveReplyTweet()}   autoFocus />
            </div>
        );
    }
    onHide(){
  this.setState({showReplyTweet:false});
}
handleReplyChange=(e)=>{
  let reply=this.state.reply;
  reply["replyMessage"]=e.target.value;
  this.setState({reply})
}

    
    itemTemplate(tweet, layout) {
        if (!tweet) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(tweet);
        
    }

    renderHeader() {
        return (
           <div className="center"><h4>Tweet</h4></div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
        <div>
            <div className="dataview-demo">
                <div className="card">
                <DataView value={this.state.tweets} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginator rows={3}/>
                
                   
                </div>
            </div>

 <Dialog header="Reply Tweet" footer={this.renderFooter()} visible={this.state.showReplyTweet} style={{ width: '40vw' }}>
                       
<br/><span>{this.state.message}</span><br/>
 <table className = "table table-striped ">
                                {
                                    this.state.replyTweets.map(
                                        reply => 
                                        <tr key = {reply.id}>
                                            <td>  { reply.loginId} </td>   
                                             <td> {reply.replyMessage}</td>
                                            
                                             </tr>)}
                                             </table>
                                             <br/><span className="error"> {this.state.error}</span>
                   <br/><input  placeholder="Enter Post" name="post" className="form-control"  
                                                value={this.state.reply["replyMessage"]} onChange={this.handleReplyChange}/>

                        </Dialog>

            </div>
        );
    }
}
                 
export default ViewTweetComponent