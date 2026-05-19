import db from "../config/db.js";

export const getSpareParts = (req, res) => {
  db.query(
    "SELECT * FROM Spare_part",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const addSparePart = (req, res) => {
  let {
    Name,
    Category,
    Quantity,
    UnitPrice,
  } = req.body;

  Name = Name?.trim();
  Category = Category?.trim();

  Quantity = Number(Quantity);
  UnitPrice = Number(UnitPrice);

  // validations
  if (!Name) {
    return res.status(400).json({
      message: "Spare part name is required",
    });
  }

  if (!isNaN(Name)) {
    return res.status(400).json({
      message:
        "Spare part name cannot be only numbers",
    });
  }

  if (!Category) {
    return res.status(400).json({
      message: "Category is required",
    });
  }

  if (Quantity <= 0) {
    return res.status(400).json({
      message:
        "Quantity must be greater than zero",
    });
  }

  if (UnitPrice <= 0) {
    return res.status(400).json({
      message:
        "Unit price must be greater than zero",
    });
  }

  let TotalPrice = Quantity * UnitPrice;

  db.query(
    `INSERT INTO Spare_part
    (Name, Category, Quantity, UnitPrice, TotalPrice)
    VALUES (?, ?, ?, ?, ?)`,
    [
      Name,
      Category,
      Quantity,
      UnitPrice,
      TotalPrice,
    ],
    (err, result) => {
      if (err) {
        console.log (err)
        return res.status(500).json(err);
        
      }

      res.status(200).json({
        message:
          "Spare part recorded successfully!",
      });
    }
  );
};