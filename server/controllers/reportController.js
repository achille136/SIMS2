import db from "../config/db.js";


export const getDailyStockOut = (req, res) => {
    const { startDate, endDate } = req.query;

    let sql = `
        SELECT 
            Stock_Out.Stock_out_id,
            Spare_part.Name AS SparePartName,
            Stock_Out.StockOutQuantity,
            Stock_Out.StockOutDate,
            Stock_Out.StockOutUnitPrice,
            Stock_Out.StockOutTotalPrice
        FROM Stock_Out
        JOIN Spare_part
        ON Stock_Out.SpId = Spare_part.SpId
    `;

    let values = [];

    if (startDate && endDate) {
        sql += ` WHERE Stock_Out.StockOutDate BETWEEN ? AND ?`;
        values = [startDate, endDate];
    }

    sql += ` ORDER BY Stock_Out.StockOutDate DESC`;

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
};

export const getStockStatus = (req, res) => {
  db.query(
    `SELECT 
      Spare_part.SpId,
      Spare_part.Name AS SparePartName,

      IFNULL(SUM(Stock_In.StockInQuantity), 0) AS StoredQuantity,

      IFNULL(StockOutData.TotalStockOut, 0) AS StockOutQuantity,

      IFNULL(SUM(Stock_In.StockInQuantity), 0) - IFNULL(StockOutData.TotalStockOut, 0) AS RemainingQuantity

    FROM Spare_part

    LEFT JOIN Stock_In
      ON Spare_part.SpId = Stock_In.SpId

    LEFT JOIN (
      SELECT 
        SpId,
        SUM(StockOutQuantity) AS TotalStockOut
      FROM Stock_Out
      GROUP BY SpId
    ) AS StockOutData
      ON Spare_part.SpId = StockOutData.SpId

    GROUP BY 
      Spare_part.SpId,
      Spare_part.Name,
      StockOutData.TotalStockOut

    ORDER BY Spare_part.Name ASC`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.status(200).json(result)
    }
  )
}