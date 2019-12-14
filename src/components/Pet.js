import React from 'react'

class Pet extends React.Component {
  constructor(props){
    super(props)
  }
  delClass=()=>{
    console.log("object")
  }

  render() {
    //show the gender symbol 
    let gender;
    if(this.props.pet.gender === 'male'){ gender ='♂'}
              else if(this.props.pet.gender === 'female') {gender ='♀'}
    return (
      <div className="card">
        <div className="content">
          <a className="header">
          
          {gender}  {/*'♀' OR '♂' */}
            PET NAME:{ this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">  PET TYPE: { this.props.pet.type}</span>
          </div>
          <div className="description">
             <p>Age: { this.props.pet.age}</p>
            <p>Weight: { this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">

         {this.props.pet.isAdopted ? ( <button className="ui disabled button">Already adopted</button>) : (
        <button onClick={() => this.props.onAdoptPet(this.props.pet.id)} className="ui primary button"> Adopt pet </button>
      )}
        </div>
      </div>
    )
  }
}

export default Pet
