const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7475056a5570443394cb89b3f2f06176'
});

const apiPoziv = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unesite validan URL!'))
}

const brUpita = (req, res, db) => {
  const { id } = req.body;
  db('korisnici').where('id', '=', id)
  .increment('brupita', 1)
  .returning('brupita')
  .then(brupita => {
    res.json(brupita[0]);
  })
  .catch(err => res.status(400).json(err))
}

module.exports = {
  brUpita,
  apiPoziv
}