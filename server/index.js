const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const { generateWalletAddress } = require('../utils');

app.get('/wallet-address/generate', (req, res) => {
    const walletAddress = generateWalletAddress();
    res.send(walletAddress);
});

const server = app.listen(PORT, () => {
    console.log(`Server up and listening on port ${PORT}`);
});

module.exports = app;