import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  
  onChangeType = (updateType) => { // the argument will be passed from filters component
    // console.log(updateType);
  
  
        if(updateType === 'all'){this.setState({
          filters :{type: '/api/pets'}
        })}
    
        else {
              let urlType =`/api/pets?type=${updateType}`
          this.setState({
          filters :{type: urlType}
        })
      }
    
      // if(updateType === 'all'){this.setState({
      //   filters :{type: {pet: '/api/pets'}}
      // })}
  
      // else if(updateType === 'cat'){this.setState({
      //   filters :{type: {pet: '/api/pets?type=cat'}}
      // })}
  
      // else if(updateType === 'dog'){this.setState({
      //   filters :{type: {pet: '/api/pets?type=dog'}}
      // })}
  
      // else if(updateType === 'micropig'){this.setState({
      //   filters :{type: {pet: '/api/pets?type=micropig'}}
      // })}
  
     // console.log(this.state.filters.type["pet"]);//shows the default 
    }

  //mistake here
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

            {/*first child here onchangetype prop and onfindpetsclick callback*/}
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">

            {/*second child here petData prop and onAdoptPet callback*/}
              <PetBrowser  pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>

          
          </div>
        </div>
      </div>
    )
  }
}

export default App
