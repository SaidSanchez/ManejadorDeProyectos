const express = require('express');

function create(req, res, next) {
    res.send(`POST = ${req.params}`);
}
function getAll(req, res, next) {
    res.send(`GET = ${req.params}`);
}

function get(req, res, next) {
    res.send(`GET = ${req.params}`);
}

function replace(req, res, next) {
    res.send(`PUT = ${req.params}`);
}

function edit(req, res, next) {
    res.send(`PATCH = ${req.params}`);
}

function destroy(req, res, next) {
    res.send(`DELETE = ${req.params}`);
}

module.exports = {
    getAll,get,create,replace,edit,destroy,
}
