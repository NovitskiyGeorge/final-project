import React, { Component } from 'react';
import './pokemonListItem.css';

export default class PokemonListItem extends Component {
   render() {
      const { name, img, onClick } = this.props;
      return (
         <div className="item" onClick={onClick}>
            <span>{name} </span>
            <img src={img} alt={name}></img>
         </div>
      )
   }
}