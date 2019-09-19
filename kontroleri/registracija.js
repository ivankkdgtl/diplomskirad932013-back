const registruj = (req, res, db, bcrypt) => {
  const { email, ime, lozinka } = req.body;
  const saltRounds = 10;
  if (!email || !ime || !lozinka) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(lozinka,saltRounds);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('korisnici')
          .returning('*')
          .insert({
            email: loginEmail[0],
            ime: ime,
            regdatum: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('email'))
}

module.exports = {
  registruj: registruj
};


