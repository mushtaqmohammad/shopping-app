import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import PostService from '../services/PostService';
import logo from '../image/download.png';

import { Rating } from 'primereact/rating';
import './TweetStyle.css';
import { Dialog } from 'primereact/dialog';

class ViewMyTweetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            showReplyTweet:false,
            showUpdateTweet:false,
            replyTweets:[],
            reply:{},
            message:'',
            error:'',
            layout: 'list',
            tweetId:'',
            updateTweet:'',
            updateTweetId:''
            
        };
    this.itemTemplate = this.itemTemplate.bind(this);
        
    }
   getReplyTweet(tweetId,tweetMessage){
    PostService.getReplyTweet(tweetId).then(response => this.setState({ replyTweets: response.data}));
    this.setState({showReplyTweet:true});
    this.setState({reply:{}});
    this.setState({message:tweetMessage});
     this.setState({tweetId:tweetId});
     this.setState({error:''});

   }
   saveReplyTweet(){
    let reply=this.state.reply;
    this.setState({error:''});
    if(reply["replyMessage"].length<=144){
    reply["tweetMessageId"]=this.state.tweetId;
    reply["loginId"]=localStorage.getItem('loginId');
    console.log(reply["replyMessage"]);
    PostService.saveReplyTweet(reply).then(response=>{
        PostService.getReplyTweet(this.state.tweetId).then(response => this.setState({ replyTweets: response.data}));

    });
}
else{
    this.setState({error:'Message size is long'});
}

   }
   handleUpdateTweetChange=(e)=>{
    e.preventDefault();
    this.setState({updateTweet:e.target.value});

   }
   displayUpdateTweet(id,tweet){
    this.setState({showUpdateTweet:true});
    this.setState({updateTweet:tweet});
    this.setState({updateTweetId:id});
}

saveUpdateTweet(){
    PostService.updateTweet(this.state.updateTweet,this.state.updateTweetId).then(response=>{
       this.setState({showUpdateTweet:false});
        this.componentDidMount();
    })
}
    componentDidMount() {
        PostService.getUserTweet().then(response => this.setState({ tweets: response.data}));
    }

    saveLike(username,id){
         PostService.saveLike(username,id).then(response=>{this.componentDidMount()});
    }
    deleteTweet(id){
        PostService.deleteTweet(id).then(response=>{this.componentDidMount()});
    }
    

    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="tweet-list-item">
                    <img src={logo} alt="Logo" />
                    <div className="tweet-list-detail">
                        <div className="tweet-name">@{data.loginId}</div>
                        <div className="tweet-description">{data.tweetMessage}&nbsp;&nbsp;{data.tweetTime}
                       </div>
                        <Button icon="pi pi-comment" title="Reply Tweet" onClick={() => this. getReplyTweet(data.id,data.tweetMessage)} ></Button>&nbsp; &nbsp;&nbsp;
                        <Button icon="pi pi-heart" title="Like Tweet" onClick={() => this.saveLike(data.loginId,data.id)} ></Button>&nbsp; &nbsp;{data.likeCount}&nbsp; &nbsp;&nbsp;
                         <Button icon="pi pi-pencil" title="Update Tweet" onClick={() => this. displayUpdateTweet(data.id,data.tweetMessage)} ></Button>&nbsp; &nbsp;&nbsp;
                         <Button icon="pi pi-trash" title="Delete Tweet" onClick={() => this. deleteTweet(data.id)} ></Button>
                        </div>
                    
                </div>
            </div>
        );
    }
renderFooter(option) {
    if(option=="reply"){
        return (
            <div>
                <Button label="Cancel"  onClick={() => this.onHide("reply")} className="p-button-text" />
                <Button label="Reply" onClick={() => this.saveReplyTweet()}   autoFocus />
            </div>
        );}
        else{
            return (
            <div>
                <Button label="Cancel"  onClick={() => this.onHide("update")} className="p-button-text" />
                <Button label="Update" onClick={() => this.saveUpdateTweet()}   autoFocus />
            </div>
        );

        }
    }
    onHide(option){
        if(option=="reply"){
  this.setState({showReplyTweet:false});
}
else{
    this.setState({showUpdateTweet:false});
}
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

 <Dialog header="Reply Tweet" footer={this.renderFooter("reply")} visible={this.state.showReplyTweet} style={{ width: '40vw' }}>
                       
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

                        <Dialog header="Update Tweet" footer={this.renderFooter("update")} visible={this.state.showUpdateTweet} style={{ width: '50vw' }}>
                        <br/><input  placeholder="Enter Post" name="post" className="form-control"  
                                                value={this.state.updateTweet} onChange={this.handleUpdateTweetChange}/>

                        </Dialog>

            </div>
        );
    }
}
                 
export default ViewMyTweetComponent