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

  handleFilter = e =>{
    this.setState({
      filters:{
        type:e.target.value
      }
    })
  }

  fetchData = () =>{
    let url = this.state.filters.type == 'all' ? '/api/pets' : '/api/pets?type='+this.state.filters.type;
    fetch(url).then(res=>res.json()).then(data=>{
      console.log(data);
      this.setState({
        pets:data
      },console.log(this.state.pets))
    }).catch(error=>console.log(error));
  }

  handleAdopt = id =>{
    let adopted = this.state.pets.find(animal=>animal.id == id);
    let all = [...this.state.pets];
    adopted.isAdopted = true;
    all[all.indexOf(adopted)] = adopted;
    console.log(adopted);
    this.setState({
      pets:all
    })
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
              <Filters onChangeType={this.handleFilter} onFindPetsClick={this.fetchData} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdopt} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App