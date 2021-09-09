import React, { Component } from 'react';
import PokemonList from '../pokemonList';
import PokemonService from '../services/pokemonService';
import SpinnerBlue from '../spinner';

export default class MainPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pokemonList: null,
         numDisplayedPokemons: 10,
         filter: 'all',
         selectedPokemon: null,
      }
      this.onCaught = this.onCaught.bind(this);
   }

   pokemonService = new PokemonService();

   componentDidMount() {
      this.mounted = true;
      this.pokemonService.getAllPokemons()
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

   getDateCaught() {
      return `${('0' + new Date().getDate()).substr(-2)}.${('0' + new Date().getMonth()).substr(-2)}.${new Date().getFullYear()}`;
   }

   onCaught({ name, id }) {
      const date = this.getDateCaught();
      const status = "Пойман";
      this.pokemonService.addCaughtPokemon({ name, id, date, status })
   }

   resetCounterDisplayedPokemons() {
      this.setState({ numDisplayedPokemons: 10 })
   }

   onPokemonSelected = (id) => {
      this.props.history.push(`/main/${id}`)
   }

   render() {
      const { pokemonList, numDisplayedPokemons } = this.state;
      if (!pokemonList) {
         return <SpinnerBlue />
      }

      return (
         <div className="app">
            <PokemonList
               pokemonList={pokemonList}
               numDisplayedPokemons={numDisplayedPokemons}
               onCaught={this.onCaught}
               onPokemonSelected={this.onPokemonSelected}
            />
         </div>
      )
   }
}
