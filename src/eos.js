const Eos = require('eosjs');

let config = {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    keyProvider: null,
    httpEndpoint: 'https://eos.greymass.com',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true
};

let eos = Eos(config);
let lastBlockId = null;

class EosClient {
    initialize () {
        return new Promise((resolve, reject) => {
            eos.getInfo({}).then(info => {
                lastBlockId = info.last_irreversible_block_id;
                resolve();
            });
        });
    }

    load (blockCount = 10) {
        return new Promise((resolve, reject) => {
            this.getBlocks(blockCount).then(blocks => resolve(blocks));
        });
    }

    getBlocks (blockCount = 10) {
        return new Promise ((resolve, reject) => {
            let blocks = [];
            let blockId = lastBlockId;
            this.getBlock(blockCount, blocks, blockId).then(blocks => resolve(blocks));
        });
    }

    getBlock (count, blocks, blockId) {
        return new Promise ((resolve, reject) => {
            if (count > 0) {
                eos.getBlock(blockId).then(block => {
                    block.count = count;
                    blocks.push(block);
                    count--;
                    this.getBlock(count, blocks, block.previous).then(blocks => resolve(blocks));
                });
            } else {
                resolve (blocks);
            }            
        });
    }
}

export default EosClient;