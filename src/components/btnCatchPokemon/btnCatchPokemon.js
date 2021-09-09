import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class BtnCatchPokemon extends Component {
   constructor(props) {
      super(props);
      this.state = {
         status: false
      }
      this.changeStatus = this.changeStatus.bind(this);
   }

   componentDidMount() {
      this.setState({
         status: this.props.status
      })
   }

   changeStatus() {
      const status = this.props.status;
      if (!status) {
         this.setState({
            status: true
         })
      }
   }

   clickBtn() {
      const { onCatch } = this.props;
      onCatch();
      this.changeStatus();
   }

   render() {
      const { status } = this.state
      return (
         <Button
            disabled={status}
            onClick={() => this.clickBtn()}
         > Поймать
         </Button >
      )
   }
}