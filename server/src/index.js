const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT }  = require('./config/server.config.js');

require('./config/db.config.js');

const setupServer = () => {
    const app = express();


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.use(cors({
        origin: [
          "http://localhost:3000",
        ],
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }));
    app.use(require('./routes/router.js'));

    app.listen(PORT, () => {
        console.log(`Server runing at Port number: ${PORT}`);
    })
};

setupServer();


