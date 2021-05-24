const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();
mongoose.set('debug', true);

const port = process.env.PORT || 3000;

//setting up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

//connecting to the database and starting the server
mongoose.connect(process.env.DBURL, {
	//to avoid deprecation warnings:
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then((db) => {
	console.log('Connected to db, good job');
	app.listen(port, () => console.log(`App running at port ${port}`))
})
.catch((err) => {
	console.log('Error in connecting to the db: \n', err);
});

//adding routes
const authRoute = require('./routes/auth/auth');
const imagesRoute = require('./routes/images/images');
app.use('/auth', authRoute);
app.use('/images', imagesRoute);

//for all undefined routes:
app.use((req, res, next) => res.status(404).end('Route not found.'));