const mysql = require("mysql2");
const config = require("../config");
const con = mysql.createConnection(config);

const createTable = (sql) => {
  con.query(sql, (err, result) => {
    if (err) throw err;
    else return result;
  });
};

const checkExistingRecords = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    con.query(sql, [value], (error, results) => {
      if (error) reject(err);
      else resolve(results.length ? results[0] : null);
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    console.log("tableName, record", tableName, record);
    con.query(sql, [record], (error, result) => {
      if (error) reject(err);
      else resolve(result);
    });
  });
};

const deleteRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${tableName} WHERE ?`;
    con.query(sql, [record], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

const getRecords = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    con.query(sql, [value], (error, results) => {
      if (error) reject(err);
      else resolve(results.length ? results[0] : null);
    });
  });
};

module.exports = {
  createTable,
  checkExistingRecords,
  insertRecord,
  getRecords,
  deleteRecord
};
