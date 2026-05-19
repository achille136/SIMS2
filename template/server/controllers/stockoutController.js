import db from "../config/db.js";

export const getRecord = (req, res) => {
  db.query("SELECT * FROM Stock_Out", (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(result);
  });
};

export const addRecord = (req, res) => {
  const {
    StockOutQuantity,
    StockOutDate,
    SpId,
    StockOutUnitPrice,
  } = req.body;

  const StockOutTotalPrice =
    Number(StockOutQuantity) * Number(StockOutUnitPrice);

  db.query(
    "SELECT IFNULL(SUM(StockInQuantity), 0) AS totalIn FROM Stock_In WHERE SpId = ?",
    [SpId],
    (err, stockInResult) => {
      if (err) return res.status(500).json(err);

      db.query(
        "SELECT IFNULL(SUM(StockOutQuantity), 0) AS totalOut FROM Stock_Out WHERE SpId = ?",
        [SpId],
        (err, stockOutResult) => {
          if (err) return res.status(500).json(err);

          const totalIn = stockInResult[0].totalIn;
          const totalOut = stockOutResult[0].totalOut;
          const availableStock = totalIn - totalOut;

          if (Number(StockOutQuantity) > availableStock) {
            return res.status(400).json({
              message: `Not enough stock. Available quantity is ${availableStock}`,
            });
          }

          db.query(
            `INSERT INTO Stock_Out
            (StockOutQuantity, StockOutDate, SpId, StockOutUnitPrice, StockOutTotalPrice)
            VALUES (?, ?, ?, ?, ?)`,
            [
              StockOutQuantity,
              StockOutDate,
              SpId,
              StockOutUnitPrice,
              StockOutTotalPrice,
            ],
            (err) => {
              if (err) return res.status(500).json(err);

              res.status(201).json({
                message: "Stock out record added successfully!",
              });
            }
          );
        }
      );
    }
  );
};

export const updateRecord = (req, res) => {
  const { id } = req.params;

  const {
    StockOutQuantity,
    StockOutDate,
    SpId,
    StockOutUnitPrice,
  } = req.body;

  const StockOutTotalPrice =
    Number(StockOutQuantity) * Number(StockOutUnitPrice);

  db.query(
    "SELECT IFNULL(SUM(StockInQuantity), 0) AS totalIn FROM Stock_In WHERE SpId = ?",
    [SpId],
    (err, stockInResult) => {
      if (err) return res.status(500).json(err);

      db.query(
        `SELECT IFNULL(SUM(StockOutQuantity), 0) AS totalOut
         FROM Stock_Out
         WHERE SpId = ? AND Stock_out_id != ?`,
        [SpId, id],
        (err, stockOutResult) => {
          if (err) return res.status(500).json(err);

          const totalIn = stockInResult[0].totalIn;
          const totalOut = stockOutResult[0].totalOut;
          const availableStock = totalIn - totalOut;

          if (Number(StockOutQuantity) > availableStock) {
            return res.status(400).json({
              message: `Not enough stock. Available quantity is ${availableStock}`,
            });
          }

          db.query(
            `UPDATE Stock_Out SET
              StockOutQuantity = ?,
              StockOutDate = ?,
              SpId = ?,
              StockOutUnitPrice = ?,
              StockOutTotalPrice = ?
             WHERE Stock_out_id = ?`,
            [
              StockOutQuantity,
              StockOutDate,
              SpId,
              StockOutUnitPrice,
              StockOutTotalPrice,
              id,
            ],
            (err, result) => {
              if (err) return res.status(500).json(err);

              if (result.affectedRows === 0) {
                return res.status(404).json({
                  message: "Stock out record not found",
                });
              }

              res.status(200).json({
                message: "Stock out record updated successfully!",
              });
            }
          );
        }
      );
    }
  );
};

export const deleteRecord = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM Stock_Out WHERE Stock_out_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Stock out record not found",
        });
      }

      res.status(200).json({
        message: "Stock out record deleted successfully!",
      });
    }
  );
};