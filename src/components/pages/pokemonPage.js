import React, { Component } from 'react';
import { Container, Row, Col, Toast, ToastHeader, ToastBody } from 'reactstrap';
import PokemonService from '../services/pokemonService';
import SpinnerBlue from '../spinner';
import './pokemonPage.css'

export default class PokemonPage extends Component {
   pokemonService = new PokemonService();
   state = {
      pokemonDate: null,
      allCaughtPokemons: null,
      allPokemons: null
   }

   componentDidMount() {
      this.pokemonService.getAllPokemons()
         .then((itemList) => {
            let allPokemons = itemList.map(item => {
               return item
            })
            this.setState({
               allPokemons
            })
         })

      this.pokemonService.getAllCaughtPokemons()
         .then((itemList) => {
            let allCaughtPokemons = itemList.map(item => {
               return item
            })
            this.setState({
               allCaughtPokemons
            })
         })
   }

   getSelectedPokemon() {
      const { allCaughtPokemons, allPokemons } = this.state;
      const idSelectedPokemon = +this.props.pokemonId;

      let statusSelectedPokemon = allCaughtPokemons.find(item => item.id === idSelectedPokemon);
      if (!statusSelectedPokemon) {
         statusSelectedPokemon = allPokemons.find(item => item.id === idSelectedPokemon);
      }
      return statusSelectedPokemon;
   }

   render() {
      const { allCaughtPokemons } = this.state;
      if (!allCaughtPokemons) {
         return <SpinnerBlue />
      }
      const pokemonDate = this.getSelectedPokemon();
      console.log(pokemonDate)
      const { name, id, date, status = 'не пойман' } = pokemonDate;
      let pathImg;

      if (id < 720) {
         pathImg = `/img/${id}.png`;
      } else {
         pathImg = `/img/unknown.png`;
      }

      return (
         <Container>
            <Row>
               <Col>
                  <div className="p-3 my-2 rounded">
                     <Toast>
                        <ToastHeader className="header-pokemon-page">
                           <div>{name}</div>
                        </ToastHeader>
                        <ToastBody>
                           <div className='wrapper'>
                              <div className='left'>
                                 <div>id: {id}</div>
                                 <div>{status}</div>
                                 <div>{date}</div>
                              </div>
                              <div className='right'>
                                 <img className='image' src={pathImg} alt={name}></img>
                              </div>
                           </div>
                        </ToastBody>
                     </Toast>
                  </div>
               </Col>
            </Row>
         </Container>
      );
   }
}