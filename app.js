var createError = require('http-errors');
var express = require('express');
const methodOverride = require('method-override');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var indexProducts = require('./routes/products');
var usersRouter = require('./routes/users');
var salesRouter = require('./routes/sales');
var error404Router = require('./routes/errors');
const { add } = require('./controllers/productsController');
const session = require('express-session');
const sessionMidelware = require ('./middlewares/session');
const coockieParser = require('cookie-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method')); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Sesiones y cookies
app.use(session({
  secret: 'Admin de usuarios',
  resave: false, // no vuelve a guardar si no hay cambios
  saveUninitialized: true, // guarda sessiones aunque todavía no haya datos
}));
app.use(coockieParser());
app.use(sessionMidelware);



//Rutas:

app.use('/', indexRouter);

app.use('/products', indexProducts);

app.use('/sales', salesRouter)

app.use('/users', usersRouter);

app.use('/', error404Router);



// PARA VER MENU SACAR DESPUÉS

// app.get("/menu", (req, res) => {
//   res.sendFile(__dirname + "/views/menu.html");
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
