import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }
  handelChangeType = ({ target: input }) => {
    const type = input.value;

    this.setState({
      filters: {
        type
      }
    });
  };

  handelFindClick = () => {
    const type = this.state.filters.type;
    const url = type === "all" ? "/api/pets" : `/api/pets?type=${type}`;

    fetch(url)
      .then(res => res.json())
      .then(pets => {
        this.setState({ pets });
      });
  };
  handelAdoptPet = petId => {
    const pets = [...this.state.pets];
    const adoptedPet = pets.find(pet => pet.id === petId);
    if (adoptedPet) {
      adoptedPet.isAdopted = true;
      const index = pets.indexOf(adoptedPet);
      pets[index] = adoptedPet;
      this.setState({
        pets
      });
    }
  };
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handelChangeType}
                onFindPetsClick={this.handelFindClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.handelAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
