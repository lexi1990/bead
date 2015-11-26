
// controllers/error.js
var express = require('express');
var router = express.Router();

var decorateAnimals = require('../viewmodels/animal');

// Állatlista oldal
router.get('/list', function (req, res) {
    req.app.models.animal.find().then(function (animals) {
        res.render('animals/list', {
            animals: decorateAnimals(animals),
            messages: req.flash('info')
        });
    });
});

// Állat felvitele
router.get('/new', function(req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('animals/new', {
        validationErrors: validationErrors,
        data: data,
    });
})

// Állat felvitele POST
router.post('/new', function(req, res) {
   // adatok ellenőrzése
    req.checkBody('nev', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('kenelszam').escape();
    req.checkBody('kenelszam', 'Hibás kenelszám').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/animals/new');
    }
    else {
        req.app.models.animal.create({
            status: 'new',
            name: req.body.nev,
            kenel: req.body.kenelszam
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Állat sikeresen felvéve!');
            res.redirect('/animals/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err)
        });
    }
})


//Állatok szerkesztése
router.get('/edit/:name', function(req, res) {
    var name = req.params.name;
    
     req.app.models.animal.findOne({name: name}).then(function (animal) {
        res.render('animals/edit', {
            animal: animal,
            messages: req.flash('info')
        });
    });
});

router.post('/edit/:name', function(req, res) {
     var name = req.params.name;
   // adatok ellenőrzése
    req.checkBody('nev', 'Hibás név').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('kenelszam').escape();
    req.checkBody('kenelszam', 'Hibás kenelszám').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/animals/edit/'+name);
    }
    else {
        req.app.models.animal.update({name: name},{
            status: req.body.status,
            name: req.body.nev,
            kenel: req.body.kenelszam
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Állat sikeresen módosítva!');
            res.redirect('/animals/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err)
        });
    }
});


//Állatok törlése
router.get('/remove/:name', function(req, res) {
    var name = req.params.name;
    
    req.app.models.animal.destroy({name: name}, function(){
        req.app.models.animal.find().then(function (animals) {
            res.render('animals/list', {
                animals: decorateAnimals(animals),
                messages: req.flash('info')
                });
            });
    });
});



module.exports = router;

