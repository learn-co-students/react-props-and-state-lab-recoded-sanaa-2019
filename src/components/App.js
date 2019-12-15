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
  types = (event) => {
    this.setState({ ...this.state.filters, type: event.target.value })
  }

  fetching = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
        .then(resp => resp.json())
        .then(data => {
          // console.log(data);
          this.setState({ pets: data })
        })

    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(data => {
          // console.log(data);
          this.setState({ pets: data })
        })
    }

  }


  adoption = (id) => {
    let arr = []
    for (const key in this.state.pets) {
      if (this.state.pets.hasOwnProperty(key)) {
        const element = this.state.pets[key];
        if (id === element.id) {
          element.isAdopted = true
          arr.push(element)
        }
      }
    }

    this.setState({ pets: arr })

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
            <Filters onChangeType={event => { this.types(event) }} onFindPetsClick={this.fetching} />
            </div>
            <div className="twelve wide column">
            <PetBrowser onAdoptPet={id => {this.adoption(id)}} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
