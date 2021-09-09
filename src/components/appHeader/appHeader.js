import React, { Component } from 'react';
import PokemonFilter from '../pokemonFilter/';
import './appHeader.css';

export class AppHeader extends Component {
   constructor(props) {
      super(props);
      this.state = {
         filter: 'all',
      };
      this.onFilterSelect = this.onFilterSelect.bind(this);
   }

   onFilterSelect(filter) {
      if (filter === 'all') {
         this.setState({
            filter
         })
      } else {
         this.setState({
            filter
         })
      }
   }

   render() {
      const { filter } = this.state;
      return (
         <div className="header">
            <PokemonFilter
               filter={filter}
               onFilterSelect={this.onFilterSelect} />
         </div >
      )
   }
}

export default AppHeader;