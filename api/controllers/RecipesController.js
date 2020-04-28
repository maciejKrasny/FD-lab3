/**
 * RecipesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: function(req, res) {
    Recipes.find({}).exec((err, recipes) => {
      if (err) {
        res.send(500, { error: 'Database Error'});
      }
      res.view('pages/list', {recipes: recipes});
    });
  },

  add: function(req, res) {
    res.view('pages/add');
  },

  create: function(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    Recipes.create({title: title, description: description}).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database Error'});
      }
      res.redirect('/recipes/list');
    });
  },

  delete: function(req, res) {
    Recipes.destroy({id: req.params.id}).exec((err) =>{
      if (err) {
        res.send(500, { error: 'Database Error'});
      }
      res.redirect('/recipes/list');
    });
    return false;
  },

  edit: function(req, res) {
    Recipes.findOne({id: req.params.id}).exec((err, recipe) => {
      if (err) {
        res.send(500, { error: 'Database Error'});
      }
      res.view('pages/edit', {recipe: recipe});
    });
  },

  update: function(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    Recipes.update({id: req.params.id}, {title: title, description: description}).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database Error'});
      }
      res.redirect('/recipes/list');
    });
    return false;
  }
};

