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

  filterHandler = (event)=>{
    this.setState({
      filters:{
        type: event.target.value
      }
    })
    console.log(this.state.filters.type)
  }

  fetchAnimals=()=>{
    let fetchUrl;
    if(this.state.filters.type == 'all'){
      fetchUrl= '/api/pets';
    } else {
      fetchUrl= '/api/pets?type='+this.state.filters.type;
    }
    fetch(fetchUrl).then(response=>response.json()).then(data=>{
      this.setState({
        pets:data
      },console.log(this.state.pets))
    }).catch(err=>console.log(err));
  }

  onAdoptPet=(id)=>{
    let petId = this.state.pets.find(pet=>pet.id == id);
    let myArr = [...this.state.pets];
    petId.isAdopted = true;
    let newPetIndex= myArr.indexOf(petId)
    myArr[newPetIndex] = petId;
    this.setState({
      pets:myArr
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
              <Filters onChangeType={this.filterHandler} onFindPetsClick={this.fetchAnimals}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
