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

  onChangeType=(updateType)=>{
    if(updateType==="all"){
      this.setState({
        filters:{type:'/api/pets'}
      })
    }
  }

  onFindPetsClick = () => {
    
    let pet;
    if(this.state.filters.type != 'all')
     {pet= `?type=${this.state.filters.type}`}else{pet=''}

    fetch('/api/pets'+pet)
      .then(res => res.json())
      .then(pets => {
        this.setState({ pets });
      });
  };

  onAdoptPet = (petID) => { // will get the id argument from PetBrowser component

    //console.log(petID);
   // console.log(this.state.pets[0].id);
    let FoundPet= this.state.pets.map(pet =>{
     if( pet.id === petID){pet.isAdopted = true;
      
      }
    } )

    this.setState({pets:this.state.pets})
     console.log("updated",this.state.pets);
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
              <Filters  onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
