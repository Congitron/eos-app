import React, { Component } from 'react';

class Block extends Component {
    constructor (props) {
        super(props);
        this.state = {
            block: props.block,
            expanded: false
        };
    }

    toggle (newState) {
        this.setState({expanded: newState});
    }

    render () {
        let rowClass = 'row App-block App-block-' + ((this.state.block.count % 2 === 0) ? 'even' : 'odd');
        
        return (
            <div onClick={() => this.toggle(!this.state.expanded)}>
            {
                this.state.expanded 
                ? (
                    <div className={rowClass}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <pre>{JSON.stringify(this.state.block, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                ) 
                : (
                    <div className={rowClass}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                id: {this.state.block.id}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                timestamp: {this.state.block.timestamp}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                action count: {this.state.block.transactions.length}
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        );
    }
}

export default Block;