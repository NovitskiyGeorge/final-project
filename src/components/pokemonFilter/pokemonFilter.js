import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class PokemonFilter extends Component {
   buttons = [
      { name: 'all', label: 'Все покемоны', path: '/' },
      { name: 'caught', label: 'Пойманные покемоны', path: '/caughtPokemons' }
   ]

   render() {
      const buttons = this.buttons.map(({ name, label, path }) => {
         const active = this.props.filter === name;
         const colorClass = active ? 'info' : 'secondary'

         return (
            <Link key={name} to={path}>
               <Button
                  className="btn-filter"
                  color={colorClass}
                  onClick={() => this.props.onFilterSelect(name)}>
                  {label}
               </Button>
            </Link>
         )
      })
      return (
         <>
            {buttons}
         </>
      )
   }
}
