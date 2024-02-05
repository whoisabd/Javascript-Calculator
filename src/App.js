import React, { Component } from 'react';
import './App.css'; 

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  toggleSign = () => {
    this.setState((prevState) => ({
      displayValue: (parseFloat(prevState.displayValue) * -1).toString(),
    }));
  };

  calculatePercentage = () => {
    this.setState((prevState) => ({
      displayValue: (parseFloat(prevState.displayValue) / 100).toString(),
    }));
  };

  handleNumber = (number) => {
    this.setState((prevState) => ({
      displayValue: prevState.displayValue === '0' || prevState.waitingForOperand
        ? number
        : prevState.displayValue + number,
      waitingForOperand: false,
    }));
  };

  handleOperator = (nextOperator) => {
    this.setState((prevState) => {
      const { displayValue, prevValue, operator } = prevState;
      const current = parseFloat(displayValue);
      const previous = parseFloat(prevValue);
  
      if (operator) {
        if (prevState.waitingForOperand && nextOperator !== '-') {
          // If waiting for operand and next operator is not '-', update the operator
          return {
            operator: nextOperator,
          };
        } else {
          // If not waiting for operand or next operator is '-', perform the operation with the last operator
          let result;
  
          if (nextOperator === '-' && prevState.waitingForOperand) {
            // Handle the case where the last operator is '-' and waiting for operand
            return {
              displayValue: nextOperator,
              operator: operator,
              waitingForOperand: false,
            };
          } else {
            result = this.performOperation(previous, current, operator);
          }
  
          if (isNaN(result)) {
            // If result is NaN, start a new calculation
            return {
              operator: nextOperator,
              waitingForOperand: true,
            };
          }
  
          return {
            displayValue: result.toString(),
            prevValue: result.toString(),
            operator: nextOperator,
            waitingForOperand: true,
          };
        }
      }
  
      return {
        prevValue: displayValue,
        operator: nextOperator,
        waitingForOperand: true,
      };
    });
  };
  
  
  
  
  

  performOperation = (prevValue, currentValue, operator) => {
    switch (operator) {
      case '+':
        return prevValue + currentValue;
      case '-':
        return prevValue - currentValue;
      case '×':
        return prevValue * currentValue;
      case '÷':
        return prevValue / currentValue;
      default:
        return currentValue;
    }
  };

  handleDecimal = () => {
    this.setState((prevState) => {
      const displayValue = prevState.waitingForOperand ? '0.' : prevState.displayValue;
      return {
        displayValue: displayValue.includes('.') ? displayValue : displayValue + '.',
        waitingForOperand: false,
      };
    });
  };

  handleEquals = () => {
    this.setState((prevState) => {
      const { displayValue, prevValue, operator } = prevState;
      const current = parseFloat(displayValue);
      const previous = parseFloat(prevValue);

      if (operator) {
        const result = this.performOperation(previous, current, operator);
        return {
          displayValue: result.toString(),
          prevValue: result.toString(),
          operator: null,
          waitingForOperand: false,
        };
      }

      return {};
    });
  };

  handleNumberOrOperator = (value) => {
    if (!isNaN(parseFloat(value)) || value === '.') {
      this.handleNumber(value);
    } else {
      this.handleOperator(value);
    }
  };

  render() {
    return (
      <div className='calculator'>
        <div id='display'>{this.state.displayValue}</div>
        <button onClick={this.clearDisplay} className='darker' id='clear'>
          AC
        </button>
        <button onClick={this.toggleSign} className='darker' id='sign'>
          +/-
        </button>
        <button onClick={this.calculatePercentage} className='darker' id='percent'>
          %
        </button>
        <button onClick={() => this.handleOperator('÷')} className='operator' id='divide'>
          ÷
        </button>
        <button onClick={() => this.handleNumber('7')} id='seven'>
          7
        </button>
        <button onClick={() => this.handleNumber('8')} id='eight'>
          8
        </button>
        <button onClick={() => this.handleNumber('9')} id='nine'>
          9
        </button>
        <button onClick={() => this.handleOperator('×')} className='operator' id='multiply'>
          ×
        </button>
        <button onClick={() => this.handleNumber('4')} id='four'>
          4
        </button>
        <button onClick={() => this.handleNumber('5')} id='five'>
          5
        </button>
        <button onClick={() => this.handleNumber('6')} id='six'>
          6
        </button>
        <button onClick={() => this.handleOperator('-')} className='operator' id='subtract'>
          -
        </button>
        <button onClick={() => this.handleNumber('1')} id='one'>
          1
        </button>
        <button onClick={() => this.handleNumber('2')} id='two'>
          2
        </button>
        <button onClick={() => this.handleNumber('3')} id='three'>
          3
        </button>
        <button onClick={() => this.handleOperator('+')} className='operator' id='add'>
          +
        </button>
        <button onClick={() => this.handleNumber('0')} id='zero'>
          0
        </button>
        <button onClick={this.handleDecimal} id='decimal'>
          .
        </button>
        <button onClick={this.handleEquals} className='operator' id='equals'>
          =
        </button>
      </div>
    );
  }
}


export default Calculator;