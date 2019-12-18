import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  onChangeType=(event)=>{
    this.setState({filters:{type:event.target.value}})
    
  }
  onFindPetsClick=()=>{
    console.log(this.state.filters);
    let type=this.state.filters.type 
    if(type==="all"){
     fetch(`/api/pets`).then(res=>res.json()).then(json=>{
      this.setState({pets:[...json]})
    })}
    else  fetch(`/api/pets?type=${type}`).then(res=>res.json()).then(json=>this.setState({pets:[...json]}))
  }
  onAdoptPet=(id)=>{
    let arr=[]
    for(let i=0;i< this.state.pets.length;i++){
      if(id===this.state.pets[i].id){
        arr[i]=Object.assign({},this.state.pets[i],{isAdopted:!this.state.pets[i].isAdopted})
      }
      else arr[i]=Object.assign({},this.state.pets[i])
    }
    this.setState({pets:arr})
    console.log(this.state.pets);
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App