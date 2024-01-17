import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    weight: 0,
    height: 0,
    resultCalc: 0,
    infoBMI:''
  };

  handleWeightChange = (event) => {
    this.setState({
      weight: event.target.value
    });
  };

  handleHeightChange = (event) => {
    this.setState({
      height: event.target.value
    });
  };

  getInfoBMI = (bmi) => {
    let message = '';
    if (bmi < 18.5) { 
        message = 'Berat rendah'; 
    } else if (bmi >= 18.5 && bmi < 25) { 
        message = 'Berat Ideal'; 
    } else if (bmi >= 25 && bmi < 30) { 
        message = 'Berat berlebih'; 
    } else { 
        message = 'Obesitas'; 
    }

    return message;
  }
  
  handleCalcBMI = (event) => {
    event.preventDefault();
    let calculate = 0;
    calculate = ((this.state.weight / Math.pow(this.state.height, 2))*10000).toFixed(2);
    
    this.setState({
      resultCalc: calculate,
      infoBMI: this.getInfoBMI(calculate)
    });
    
    
  }

  render() {
    return (
      <div className="App flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} className="App-logo mx-auto h-10 w-auto" alt="logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">BMI Calculator</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">        
          <form onSubmit={this.handleCalcBMI} className="space-y-6">
            <div>
              <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                Tinggi (cm)
              </label>
              <div className="mt-2">
                <input type="number" id="height" name="height" required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={this.state.height} onChange={this.handleHeightChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                Berat (kg)
              </label>
              <div className="mt-2">
                <input type="number" id="weight" name="weight" required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={this.state.weight} onChange={this.handleWeightChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Hitung BMI
              </button>
            </div>
          </form>

          <div className="mt-6 bg-gray-100 p-4">
            <div>
              BMI Anda: <span className="font-semibold">{this.state.resultCalc}</span>
            </div>
            <div>
              Hasil: <span className="font-semibold">{this.state.infoBMI}</span>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            &copy; 2024 Andrew Febrianto. All rights reserved.
          </p>
        </div>
      </div>
    )
  }
}

export default App;
