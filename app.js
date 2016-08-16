var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();


mongoose.connect('mongodb://localhost/node-movie');

//设置view的路径
app.set('views','./views/pages');
//设置模版引擎
app.set('view engine','jade');

//bodyParser 解析req.body的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//静态文件的路径
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

//监听端口
app.listen(port);

app.get('/',function (req,res) {
    Movie.fetch(function (err,movies) {
        if (err){
            console.log(err)
        }

        res.render('index',{
            title: 'node-movie 首页',
            movies:movies
        })
    })
});


app.get('/movie/:id',function (req,res) {
    var id = req.params.id;
    Movie.findById(id, function (er,movie) {
        if (er){
            console.log(err)
        }

        res.render('detail',{
            title: 'node-movie ' + movie.title,
            movie: movie
        })
    })
});

app.get('/update/:id',function (req,res) {
    var id = req.params.id;

    if (id){
        Movie.findById(id,function (err,movie) {
            if (err){
                console.log(err)
            }

            res.render('admin',{
                title: "node-movie 后台更新页",
                movie: movie
            })

        })
    }
});

app.delete('/delete/:id',function (req,res) {
    var id = req.params.id;

    if (id){
        Movie.deleteById(id,function (err,movie) {
            if (err){
                console.log(err)
            }

            res.json({success: true})
        })
    }
});

app.get('/admin/movie',function (req,res) {
    res.render('admin',{
        title: 'node-movie 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
});

app.post('/admin/movie/new',function (req,res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var __movie;

    if (id != "undefined") {
        Movie.findById(id,function (er,movie) {
            if (er){
                console.log(er)
            }

            __movie = _.extend(movie,movieObj)
            __movie.save(function (err,movie) {
                if (err){
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id);
            })
        })
    }
    else {
        __movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        
        __movie.save(function (err,movie) {
            if (err){
                console.log(err)
            }

            res.redirect('/movie/' + movie._id);
        })
    }
});


app.get('/admin/list',function (req,res) {
    Movie.fetch(function (err,movies) {
        if (err){
            console.log(err)
        }

        res.render('list',{
            title: 'node-movie 列表页',
            movies: movies
        })
    })
});

