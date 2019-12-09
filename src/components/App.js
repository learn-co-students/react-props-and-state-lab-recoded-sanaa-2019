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
  handleFilter = (event)=>{
    this.setState({
      filters:{
        type: event.target.value
      }
    })}
    fetchAnimals=()=>{
      let Url;
      if(this.state.filters.type == 'all'){
        Url= '/api/pets';
      } else {
        Url= '/api/pets?type='+this.state.filters.type;
      }
      fetch(Url).then(response=>response.json()).then(data=>{
        this.setState({
          pets:data
        })
      }).catch(error=>console.log(error));
    }
  
   AdoptPetHandle= Id => {
      const pet = [...this.state.pets];
      const petAdopted = pets.find(pet => pet.id === Id);
      if (petAdopted) {
        petAdopted.isAdopted = true;
        const el = pet.indexOf(petAdopted);
        pet[el] = petAdopted;
        this.setState({
          pets
        });
      }
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
             
            <Filters onChangeType={this.handleFilter} onFindPetsClick={this.fetchAnimals}/>
            </div>
            <div className="twelve wide column">
            <PetBrowser onAdoptPet={this.AdoptPetHandle} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
