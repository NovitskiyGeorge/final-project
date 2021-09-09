import React, { Component } from 'react';
import PokemonList from '../pokemonList';
import PokemonService from '../services/pokemonService';
import SpinnerBlue from '../spinner';

export default class CaughtPokemonsPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pokemonList: null,
         numDisplayedPokemons: 10,
         filter: 'caught',
         selectedPokemon: null,
      }
      this.onCaught = this.onCaught.bind(this);
   }

   pokemonService = new PokemonService();

   componentDidMount() {
      this.mounted = true;
      this.pokemonService.getAllCaughtPokemons()
         .then((itemList) => {
            let pokemonList = itemList.map(item => {
               return item
            })
            this.setState({
               pokemonList
            })
         })
   }

   handleScrollEvents(e) {
      if (this.mounted) {
         const { numDisplayedPokemons, pokemonList } = this.state;
         if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) &&
            numDisplayedPokemons < pokemonList.length) {
            this.addNumberShowPokemons();
         }
      }
   }

   componentDidUpdate() {
      window.addEventListener('scroll', (e) => {
         this.handleScrollEvents(e);
      })
   }

   componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('scroll', (e) => {
         this.handleScrollEvents(e);
      })
   }

   addNumberShowPokemons() {
      let count = this.state.numDisplayedPokemons;
      count += 5;
      this.setState({ numDisplayedPokemons: count })
   }

   onCaught({ name, id }) {
      this.pokemonService.addCaughtPokemon({ name, id })
   }

   resetCounterDisplayedPokemons() {
      this.setState({ numDisplayedPokemons: 10 })
   }

   onPokemonSelected = (id) => {
      this.props.history.push(`/caughtPokemons/${id}`)
   }

   render() {
      const { pokemonList, numDisplayedPokemons } = this.state;
      if (!pokemonList) {
         return <SpinnerBlue />
      }
      const visiblePokemons = pokemonList;
      return (
         <div className="app">
            <PokemonList
               pokemonList={visiblePokemons}
               numDisplayedPokemons={numDisplayedPokemons}
               onCaught={this.onCaught}
               onPokemonSelected={this.onPokemonSelected}
            />
         </div>
      )
   }
}
