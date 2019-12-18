import React from 'react'

class Pet extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      adobtBtn:"ui primary button",
      notAdobted:"ui disabled button",
    }
  }
  isAdobt=()=>{
    let is=this.props.pet.isAdopted
    console.log(is)
    if(is===false){
      return [
      <button className="ui primary button" onClick={()=>this.props.onAdoptPet(this.props.pet.id)}>Adopt pet</button>]
    }
    else if(is===true){
      return [<button className="ui disabled button">Already adopted</button>,]
    }
  }
  gender=(g)=>{
    if(g==="male"){
      return "♂"
    }
    else return "♀"
  }
  render() {
    return (
      <div className="card">
      <div className="content">
      <a className="header">
      {/*'♀' OR '♂' */} 
      {this.gender(this.props.pet.gender)}
      {this.props.pet.name}
      </a>
      <div className="meta">
      <span className="date">PET TYPE {this.props.pet.type}</span>
      </div>
      <div className="description">
      <p>Age: {this.props.pet.age}</p>
      <p>Weight: {this.props.pet.weight}</p>
      </div>
      </div>
      <div className="extra content">
      
      {this.isAdobt()}
      </div>
      </div>
      )
    }
  }
  
  export default Pet
  