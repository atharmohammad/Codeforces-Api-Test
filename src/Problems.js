import React,{Component} from 'react';
import axios from 'axios';
import * as api from './API/API'


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class Problems extends Component{

  state={
    problems:[]
  }

  fetchProblemsHandler=()=>{
    axios.get(api.problemset)
      .then(res=>{
        console.log(res.data)
        const arr = res.data.result.problems.slice(0);
        shuffleArray(arr);
        this.setState({problems:arr})
      })
      .catch(err=>console.log(err));


  }
  render(){
    let probs;
    if(this.state.problems.length > 0 ){
      let len = 0;
       probs = this.state.problems.map(prob=>{
        if(prob.rating >= 1500 && prob.rating <=1600){
          let url = "https://codeforces.com/problemset/problem/" + prob.contestId + '/'+ prob.index + '/';
          len++;
          if(len<6){
            return(
              <div>
                <a href={url}>{prob.name}</a>
              </div>
            )
          }
        }

      })
    }
    else{
      probs = (
        <div>
          <p>Please Click on Button Below</p>
          <button onClick={this.fetchProblemsHandler}>Get Problems</button>
        </div>
        )
    }

    return(
      <div>
        {probs}
      </div>
    )
  }
}

export default Problems
