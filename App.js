import React from 'react';
import { render } from 'react-dom';
import Transaz from './Transaz.js';
var BarChart = require('react-chartjs').Bar;
var PieChart = require('react-chartjs').Pie;


var data1 = {

    labels: ["Affari", "Benzina", "Acquisti", "Vacanze", "Ufficio", "Hobby", "Meccanica", "Motori", "Elettronica"],
    datasets: [
        {
            label: "Entrate",
            fillColor: "rgba(99,240,220,0.2)",
            strokeColor: "rgba(99,240,220,1)",
            pointColor: "rgba(99,240,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            label: "Uscite",
            fillColor: "rgba(205,99,151,0.2)",
            strokeColor: "rgba(205,99,151,1)",
            pointColor: "rgba(205,99,151,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

var data2 = [
   {
      value: 0,
      label: 'Affari',
      color: '#811BD6'
   },
   {
      value: 0,
      label: 'Benzina',
      color: '#9CBABA'
   },
   {
      value: 0,
      label: 'Acquisti',
      color: '#D18177'
   },
   {
      value : 0,
      label: 'Vacanze',
      color: '#6AE128'
   },
   {
      value : 0,
      label: 'Ufficio',
      color: '#2A56B2'
   },
   {
      value : 0,
      label: 'Hobby',
      color: '#6BC31A'
   },
   {
      value : 0,
      label: 'Meccanica',
      color: '#1C34B9'
   },
   {
      value : 0,
      label: 'Motori',
      color: '#123456'
   },
   {
      value : 0,
      label: 'Elettronica',
      color: '#67A4BA'
   },
];

const stringa = prompt("Inserisci il tuo nome");

var transazioni = [];

class Lista extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      categoria: 'Affari',
      segno: '+',
      transazione: '',
      data: '',
    };
  }

  componentDidMount() {

    this.calcoloTot();

  }

  calcoloTot() {

    let somma = 0;

    for (let cont = 0 ; cont < transazioni.length ; cont++){

      if (transazioni[cont].segno === '+'){
        somma += parseInt(transazioni[cont].transazione);
      }
      else {
        somma -= parseInt(transazioni[cont].transazione);
      }
    }

    this.setState({total: somma});
  }

  pushGraficoBar(segno, categoria) {

    let transition = parseInt(this.state.transazione);
    let posizione = data1.labels.indexOf(categoria);

    if (segno === '+'){
      data1.datasets[0].data[posizione] += transition;
    }
    else {
      data1.datasets[1].data[posizione] +=transition;
    }
  }

  totale() {

    let somma = 0;

    for (let cont = 0 ; cont < data2.length ; cont++) {
      somma += data1.datasets[0].data[cont];
    }

    return somma;
  }

  pushGraficoPie() {

    let percentuale;

    for (let cont = 0 ; cont < data2.length ; cont++) {
      percentuale = data1.datasets[0].data[cont];
      percentuale = Math.round((percentuale/this.totale())*100);
      data2[cont].value = percentuale;
    }
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

    localStorage.setItem('salvataggio', JSON.stringify(transazioni));

    this.calcoloTot();

    localStorage.setItem('datas', this.state.total);

    this.pushGraficoBar(this.state.segno, this.state.categoria);

    this.pushGraficoPie();

    localStorage.setItem('graf1', JSON.stringify(data1));
    localStorage.setItem('graf2', JSON.stringify(data2));

    localStorage.setItem('prova', 'ciao');
  }

  render() {

    return(

      <div>

        <font color="#0095cd" size="8">
          Hi {stringa.toString()}, here your transitions
        </font> <br /><br />

        <BarChart data={data1} width="500" height="400" /> <PieChart data={data2} width="500" height="400" /> <br /><br />

        Il tuo Saldo: <span> {this.state.total} € </span> <br /><br />

        <Transaz lista={transazioni} /> <br />

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

if (localStorage.getItem('prova')) {
  transazioni = JSON.parse(localStorage.getItem('salvataggio'));
  data1 = JSON.parse(localStorage.getItem('graf1'));
  data2 = JSON.parse(localStorage.getItem('graf2'));
}

render(<Lista /> , document.getElementById('lista'));
