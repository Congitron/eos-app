import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EosClient from './eos.js';
import Block from './Block.js';

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      blockCount: 10,
      blocks: [],
      loadingMsg: 'Fetching latest blocks...'
    };

    this.eos = null;
  }

  componentDidMount () {
    this.eos = new EosClient();
    this.refreshBlocks();
  }

  async refreshBlocks () {
    this.setState({loadingMsg: 'Fetching  latest blocks...'});

    await this.eos.initialize();
    let blocks = await this.eos.load(this.state.blockCount);
    
    this.setState({blocks: blocks})
    this.setState({loadingMsg: `Last ${this.state.blockCount} blocks:`});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EOS App</h1>
        </header>
        <button className="btn btn-primary App-load-btn" onClick={() => this.refreshBlocks()}>Load</button>
        <h2 className="App-intro">
          {this.state.loadingMsg}
        </h2>
        <div className="container">
        {
          this.state.blocks.map(block => 
            <Block key={block.id} block={block}/>
          )
        }
        </div>
      </div>
    );
  }
}

export default App;
