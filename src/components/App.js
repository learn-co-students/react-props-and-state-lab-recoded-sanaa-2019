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

  handleFilterType = event =>{
    this.setState({
      filters:{
        type:event.target.value
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
    }).catch(err=>console.log(err));
  }

  handleAdopting = id =>{
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
      <div>
        <header>
          <h1>React Animal Shelter</h1>
        </header>
        <div>
          
            <div>
              <Filters onChangeType={this.handleFilterType} onFindPetsClick={this.fetchData} />
            </div>
            <div>
              <PetBrowser onAdoptPet={this.handleAdopting} pets={this.state.pets} />
            </div>
         
        </div>
      </div>
    )
  }
}

export default App