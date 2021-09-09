import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CaughtPokemonsPage, MainPage, PokemonPage } from '../pages';
import AppHeader from '../appHeader/';
import { Col, Row, Container } from 'reactstrap';
import ErrorBoundary from '../errorBoundary';
import './app.css';

export default class App extends Component {

   render() {
      return (
         <Router>
            <div className="app">
               <Container>
                  <Row>
                     <Col>
                        <AppHeader />
                     </Col>
                  </Row>
               </Container>
               <Container>
                  <Row>
                     <Col>
                        <ErrorBoundary>
                           <Route path='/' exact component={MainPage} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                           <Route path='/caughtPokemons' exact component={CaughtPokemonsPage} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                           <Route path='/main/:id' render={
                              ({ match }) => {
                                 const { id } = match.params;
                                 return <PokemonPage pokemonId={id} />
                              }
                           } />
                        </ErrorBoundary>
                        <ErrorBoundary>
                           <Route path='/caughtPokemons/:id' render={
                              ({ match }) => {
                                 const { id } = match.params;
                                 return <PokemonPage pokemonId={id} />
                              }
                           } />
                        </ErrorBoundary>
                     </Col>
                  </Row>
               </Container>
            </div>
         </Router>
      )
   }
}
