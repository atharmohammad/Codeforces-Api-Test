import React,{Component} from 'react';
import axios from 'axios';
import * as api from '../API/API'

class User extends Component{

  state={
    user:null,
    submissions:[]
  }

  fetchProblemsHandler=(event)=>{
    event.preventDefault()
    let profile = document.getElementById('profile').value;
    axios.get(api.user + profile)
      .then(res=>{
        // console.log(res.data.result[0]);
        this.setState({user:res.data.result[0]})
      })
      .catch(err=>console.log(err));
      // [Handle]&from=1&count=10
      axios.get(api.userSubmissions+profile+'&from=1&count=5')
        .then(res=>{
          // console.log(res.data.result)
          this.setState({submissions:res.data.result})
        })
        .catch(err=>console.log(err))

  }
  render(){
    let user = null;
    let submissions = null;
    if(this.state.user){
      let prof = this.state.user;
      user = (
        <div>
          <img src={prof.avatar} />
          <h2>Handle : {prof.handle}</h2>
          <p>Name : {prof.firstName} {prof.lastName}</p>
          <p>Country: {prof.country}</p>
          <p>City: {prof.city}</p>
          <p>Contibution: +{prof.contribution}</p>
          <p>Rating: +{prof.rating}</p>
        </div>
      )

       submissions = this.state.submissions.map(sub=>{
        let obj = sub.problem;
        return(
          <div>
            <h2>{obj.index} {obj.name}</h2>
            <p>Verdict : {sub.verdict}</p>
            <p>Rating : {obj.rating}</p>
            <p>Tags : {obj.tags.map(temp=>{
              return(
                <div>
                  {temp} ,
                </div>
              )
            })}</p>
          </div>
        )
      })
    }
    return(
      <div>
      {user}
      <form>
        <input id="profile" type='text' placeholder="enter your codeforces handle"/>
        <button onClick={this.fetchProblemsHandler}>Get Profile</button>
      </form>
      {submissions}
      </div>
    )
  }
}

export default User
