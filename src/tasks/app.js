const appJs = (db) => {
  let setUpRequired = "";

  if (db.toLowerCase() === "mongodb") {
    setUpRequired = `import "./models/setup";`;
  }
  return `import express from 'express';
        import cors from 'cors';
        import dotenv from 'dotenv';
        import routes from './routes';
        ${setUpRequired}
        
        dotenv.config();
        
        const port = process.env.PORT || 8000;
        const app = express();
        
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(cors());
        app.use('/', routes);
        app.use('*', (req, res) => {
            res.status(404).send({
                message: "Url not found"
            });
        });
        
        app.listen(port, () => {
            console.log("Server connected successfully")
        });
        
        export default app;
        `;
};

module.exports = appJs;
