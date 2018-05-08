const path = require('path');

const config = require('./config');

module.exports = {
  apps: [
    {
      name: config.app.name,
      script: path.resolve(__dirname, 'index.js'),
      env: {
        'NODE_ENV': 'production',
      },
      exec_mode: 'fork'
    },
  ],
};
