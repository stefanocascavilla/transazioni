import React from 'react';
import { render } from 'react-dom';
import Transaz from './Transaz.js';

const stringa = prompt("Inserisci il tuo nome");
var transazioni = [
  {
    "categoria" : "Benzina",
    "transazione" : "20",
    "segno" : "+",
    "data" : "2016/02/16"
  },
  {
    "categoria" : "Elettronica",
    "transazione" : "290",
    "segno" : "+",
    "data" : "2016/03/20"
  },
  {
    "categoria" : "Motori",
    "transazione" : "150",
    "segno" : "+",
    "data" : "2016/05/14"
  },
  {
    "categoria" : "Meccanica",
    "transazione" : "100",
    "segno" : "-",
    "data" : "2016/04/23"
  },
];

class Lista extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      categoria: '',
      segno: '',
      transazione: '',
      data: '',
    };

    this.calcoloTot = this.calcoloTot.bind(this);
  }

  componentDidMount() {
    this.calcoloTot();
  }

  calcoloTot() {

    let somma;
    let differenza;
    
    for (var cont = 0 ; cont<transazioni.length ; cont++){
      console.log(transazioni[cont]);
      if (transazioni[cont].segno === '+'){
        somma = parseInt(transazioni[cont].transazione);
        this.setState({total: this.state.total + somma});
      }
      else{
        differenza = parseInt(transazioni[cont].transazione);
        this.setState({total: this.state.total - differenza});
      }
    }

    // this.refs.screen.innerHTML = this.state.total;
  }

  changeCat(event) {
    this.setState({categoria: event.target.value});
  }

  changeSegn(event) {
    this.setState({segno: event.target.value});
  }

  changeTrans(event) {
    this.setState({transazione: event.target.value});
  }

  changeDate(event) {
    this.setState({data: event.target.value});
  }

  addItem(event) {
    event.preventDefault();

    transazioni.push({categoria: this.state.categoria, transazione: this.state.transazione, segno: this.state.segno, data: this.state.data});

    this.setState({transazione: '', data: ''});
  }

  render() {

    return(
      <div>

        <font color="#0095cd" size="8">
          Hi {stringa.toString()}, here your transitions
        </font> <br /><br />

        Totale Transazioni <span ref="screen">{this.state.total}</span> <br /><br />

        <Transaz lista={transazioni}/> <br />

        <form>
          <select onChange={this.changeCat.bind(this)}>
            <option value="Affari"> Affari </option>
            <option value="Benzina"> Benzina </option>
            <option value="Acquisti"> Acquisti </option>
            <option value="Vacanze"> Vacanze </option>
            <option value="Ufficio"> Ufficio </option>
            <option value="Hobby"> Hobby </option>
            <option value="Meccanica"> Meccanica </option>
            <option value="Motori"> Motori </option>
            <option value="Elettronica"> Elettronica </option>
          </select> &nbsp;&nbsp;&nbsp;

          <select onChange={this.changeSegn.bind(this)}>
            <option value="+"> + </option>
            <option value="-"> - </option>
          </select> &nbsp;&nbsp;&nbsp;

          <input type="number" placeholder="Valore transazione" min="0" onChange={this.changeTrans.bind(this)}/> &nbsp;&nbsp;&nbsp;

          <input type="date" onChange={this.changeDate.bind(this)}/> <br /><br />

          <button id="pulsante" onClick={this.addItem.bind(this)}> Aggiungi Transazione </button>
        </form>

      </div>
    );
  }
}

render(<Lista /> , document.getElementById('lista'));
