import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="ui cards">
    {/* //PET COMPONENT SHOULD GO HERE
  // {console.log("pets",this.props.pets[0])} */}
  

  {/* // callback function will be passed to Pet component .. 
  // PetBrowser is like the middle man here, passing onAdoptPet from App to Pet component */}
    
    {this.props.pets.map(pet =>  <Pet  pet={pet} onAdoptPet={this.props.onAdoptPet}/> )}
    
    </div>
  }
}

export default PetBrowser
