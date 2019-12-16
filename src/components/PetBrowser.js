import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  pet=()=>{
    return this.props.pets.map(e=>{
      return <Pet onAdoptPet={this.props.onAdoptPet} pet={e}/>
    })
  }
  render() {
    return <div className="ui cards">PET COMPONENT SHOULD GO HERE
    {this.pet()}
    </div>
  }
}

export default PetBrowser
