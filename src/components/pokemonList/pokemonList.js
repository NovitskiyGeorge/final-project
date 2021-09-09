import React, { Component } from 'react';
import PokemonListItem from '../pokemonListItem';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BtnCatchPokemon from '../btnCatchPokemon/btnCatchPokemon';
import PokemonService from '../services/pokemonService';
import SpinnerBlue from '../spinner';
import './pokemonList.css';

export default class PokemonList extends Component {
   pokemonService = new PokemonService();
   state = {
      listIdCaughtPokemons: null
   }

   componentDidMount() {
      this.pokemonService.getAllCaughtPokemons()
         .then((itemList) => {
            let listIdCaughtPokemons = itemList.map(item => {
               return item.id
            })
            this.setState({
               listIdCaughtPokemons
            })
         })
   }

   checkContentCaughtPokemons(id) {
      let idCaughtPokemons = this.state.listIdCaughtPokemons;
      if (idCaughtPokemons.includes(id)) {
         return true;
      } else {
         return false;
      }

   }

   getNumberShowPokemons(pokemonList, numDisplayedPokemons) {
      if (pokemonList.length < numDisplayedPokemons) {
         return pokemonList.length;
      } else {
         return numDisplayedPokemons;
      }
   }

   getArrayElements({ numShowPokemons, pokemonList, onCaught, onPokemonSelected }) {
      const elements = [];
      for (let i = 0; i < numShowPokemons; i++) {
         const { id, name } = pokemonList[i];
         let statusBtn = this.checkContentCaughtPokemons(id);
         let pathImg;
         if (id < 720) {
            pathImg = `/img/${id}.png`;
         } else {
            pathImg = `/img/unknown.png`;
         }

         elements.push(
            <ListGroupItem key={id}>
               <PokemonListItem
                  name={name}
                  img={pathImg}
                  onCaught={() => onCaught(id)}
                  onClick={() => onPokemonSelected(id)}
               >
               </PokemonListItem>
               <BtnCatchPokemon
                  status={statusBtn}
                  onCatch={() => onCaught({ id, name })}>
               </BtnCatchPokemon>
            </ListGroupItem>
         )
      }
      return elements;
   }

   render() {
      const { pokemonList, numDisplayedPokemons, onCaught, onPokemonSelected } = this.props;
      if (!this.state.listIdCaughtPokemons) {
         return <SpinnerBlue />
      }

      let numShowPokemons = this.getNumberShowPokemons(pokemonList, numDisplayedPokemons);
      const elements = this.getArrayElements({ pokemonList, numShowPokemons, onCaught, onPokemonSelected })

      return (
         <ListGroup className="app-list">
            {elements}
         </ListGroup>
      )
   }
}



