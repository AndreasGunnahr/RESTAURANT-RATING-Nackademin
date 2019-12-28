if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
} 
var methodOverride = require('method-override')
var createError = require('http-errors');
var express = require('express');
var exphbs  = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var bcrypt = require('bcrypt');
var flash = require('express-flash');
var session = require('express-session');
var port = process.env.PORT || 3000;
// var db = require('./db/index');

var app = express();

// Configure the view engine 
app.engine('hbs', exphbs({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'layout',
  extname: 'hbs'
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));


const initializePassport = require('./middleware/passport-config')
initializePassport(
  passport,
  username => db.one('Users', `username`, username),
  id => db.one('Users', `id`, id)
)



var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var loginRouter = require('./routes/login');
// var registerRouter = require('./routes/register');
// var profileRouter = require('./routes/profile')
// var postsRouter = require('./routes/posts')

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);
// app.use('/profile', profileRouter)
// app.use('/post', postsRouter)

app.delete('/logout', function(req,res){
  req.logOut();
  res.redirect('/login');
})


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));   
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.listen(port, () => console.log(`App listening to port ${port}`));
