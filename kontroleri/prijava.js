const prijavi = (db, bcrypt) => (req, res) => {
  const { email, lozinka } = req.body;
  if (!email || !lozinka) {
    return res.status(400).json('Lose uneti podaci!');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      if(data.length===0){
        res.status(400).json('Pogresna kombinacija!');
      };
      const isValid = bcrypt.compareSync(lozinka, data[0].hash);
      if (isValid) {
        return db.select('*').from('korisnici')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('Greska pri ucitavanju korisnika!'))
      } else {
        res.status(400).json('Pogresna kombinacija!')
      }
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
  prijavi: prijavi
}