import db from "../config/db.js"

export const getRecord = (req,res)=>{
    db.query("SELECT * FROM Stock_In", (err, result)=>{
        if(err) res.status(500).json(err)
        res.status(200).json(result)
    } )
} 

export const addRecord = (req,res) => {
    let { StockInQuantity, StockInDate, SpId } = req.body

    db.query("INSERT INTO Stock_In( StockInQuantity, StockInDate, SpId ) VALUES (?,?,?)", [StockInQuantity, StockInDate, SpId], (err)=>{
        if(err) res.status(500).json(err)
        res.status(200).json({message: "Stock in recorded added successfully!"})
    } )
}




