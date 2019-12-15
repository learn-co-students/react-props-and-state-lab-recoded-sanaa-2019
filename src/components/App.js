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
  changeTypeHandler = event =>{
    this.setState({
      filters:{
        type:event.target.value
      }
    })
  }

  fetchPets = () =>{
    let url = '/api/pets';

    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(res => res.json())
      .then(obj => {
        this.setState(
          { pets : obj }
        )
      })
  }

  onAdoptPetHandler = id =>{
    let allPets = []
    for(let i =0;i<this.state.pets.length;i++)
    {
      if(this.state.pets[i].id==id)
      {
        allPets.push(this.state.pets[i])
        allPets[i].isAdopted = true
      }else
      allPets.push(this.state.pets[i])
    }
    this.setState({
      pets:allPets
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
              <Filters onChangeType={this.changeTypeHandler} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPetHandler} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
