import React from 'react';
import { render } from 'react-dom';

class Transaz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  searching(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    const filt = this.state.search.toLowerCase();

    let filtro = this.props.lista.filter(
      function(elemento) {
        return (elemento.categoria.toLowerCase().indexOf(filt) !== -1);
      }
    );

    return (
      <div>

        <input type="text" onChange={this.searching.bind(this)} placeholder="Cerca nella lista" />

        <ul>
          {filtro.map(function(elemento){
            return (<li> {elemento.categoria} {elemento.segno}{elemento.transazione} &nbsp;&nbsp; <b>{elemento.data}</b></li>);
          })
        }
        </ul>
      </div>
    );
  }
}

export default Transaz;
