const express = require('express');
const Card = require('../models/card');

function list(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  Card.paginate({}, {page:page, limit: 5})
       .then(objs => res.render("card/titles", {cards: objs}));

}

function index(req, res, next){
    const id = req.params.id;
    Card.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.card'),
        obj: ex
    }));
}

function add(req, res, next) {
    res.render('card/titles', {});
}

function create(req, res, next){
    const narrative = req.body.narrative;
    const rol = req.body.rol;
    const functionality = req.body.functionality;
    const benefit = req.body.benefit;
    const criteria = req.body.criteria;
    const context = req.body.context;
    const events = req.body.events;
    const results = req.body.results;
    const priority = req.body.priority;
    const size = req.body.size;
    const validated = req.body.validated;

    let card = new Card({
        narrative:narrative,
        rol:rol,
        functionality:functionality,
        benefit:benefit,
        criteria:criteria,
        context:context,
        events:events,
        results:results,
        priority:priority,
        size:size,
        validated:validated
    });

    card.save().then(obj => res.redirect ('cards/'))
    .catch(ex => res.status(500).json({
        message: res.__('ncr.card'),
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let priority = req.body.priority ? req.body.priority : "";
    let size = req.body.size ? req.body.size : "";

    let card = new Object({
        name : name,
        priority : priority,
        size : size,
    });

    Card.findOneAndUpdate({"_id":id}, card).then(obj => res.status(200).json({
        message: res.__('rp.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.card'),
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let priority = req.body.priority;
    let size = req.body.size;
    let validated = req.body.validated;

    let card = new Object();

    if(name){
        card._name = name;
    }
    if(priority){
        card._priority = priority;
    }
    if(size){
        card._size = size;
    }
    if(validated){
        card._validated = validated;
    }

    Card.findOneAndUpdate({"_id":id}, card).then(obj => res.status(200).json({
        message: res.__('up.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.card'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Card.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ndl.card'),
        obj: ex
    }));
}

module.exports = {
    list, index, add, create, replace, edit, destroy
};
