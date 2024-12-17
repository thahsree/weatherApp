const { query } = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const getUsers = (req, res) => {
  console.log(req.session.user, "reached here");
  try {
    db.query("SELECT * FROM users", (error, result) => {
      if (error) {
        return res.status(500).json({ message: "internal server error" });
      }

      const users = result;

      return res.status(200).json({ users: users });
    });
  } catch (error) {
    console.log(error);
  }
};

const getRecentSearch = (req, res) => {
  console.log("REACHED HERE");
  try {
    const user = req.email;
    console.log(user, "user");

    if (user) {
      db.query(
        `SELECT * FROM recent_search WHERE email = ?`,
        [user],
        (error, result) => {
          if (error) {
            res.status(500).json({ message: "Internal server Error" });
          }
          if (result == null || undefined) {
            return res.status(204).json({ message: "no recent searches" });
          }

          return res.status(200).json({ result });
        }
      );
    } else {
      return res.status(400).json({ message: "No user loggedin" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addSearch = (req, res) => {
  try {
    const email = req.email;
    const { query } = req.body;
    console.log(email);

    if (email) {
      db.query(
        `INSERT INTO recent_search SET ?`,
        { email, query },
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.status(200).json({ message: "success", result });
        }
      );
    } else {
      return res.status(400).json({ message: "No user logged in" });
    }
  } catch (error) {
    console.log(error);
  }
};

const allSearches = (req, res) => {
  try {
    db.query("SELECT * FROM recent_search", (error, result) => {
      if (result == undefined || null) {
        return res.status(200).json({ message: "no data found" });
      }
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
      }
      return res.status(200).json({ result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getUsers, getRecentSearch, addSearch, allSearches };
