const Sequelize = require('sequelize');

//CONNECTION TO DATABASE
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres:localhost/litmus`
);

const Subreddits = db.define('subreddits', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING
  }
});

const Comments = db.define('comments', {
  content: {
    type: Sequelize.STRING
  }
});

//Subreddit.hasMany(Comment);

syncAndSeed = async() => {
  Subreddits.sync({force: true})
  await Subreddits.create({
    name: 'ThereWasAnAttempt'
  })
}
//syncAndSeed()

const wellItsAHackathon = [

]

//EXPORT
module.exports = { db, Subreddits, Comments }
