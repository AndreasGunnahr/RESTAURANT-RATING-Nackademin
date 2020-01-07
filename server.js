if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
} 
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');
var port = process.env.PORT || 3000;
var db = require('./db/index');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
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
  username => db.one('users', `username`, username),
  id => db.one('users', `id`, id)
)

var indexRouter = require('./routes/index');
var uploadsRouter = require('./routes/uploads');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var profileRouter = require('./routes/profile')
var postRouter = require('./routes/post')

app.use('/', indexRouter);
app.use('/uploads', uploadsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter);

app.delete('/logout', function(req,res){
  req.logOut();
  res.redirect('/login');
})

app.listen(port, () => console.log(`App listening to port ${port}`));