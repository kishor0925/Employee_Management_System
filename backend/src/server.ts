
import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { EmployeeController } from "./controllers/EmployeeController";
import { GetEmployeeController } from "./controllers/GetEmployeeController";

const app = express();

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

useExpressServer(app, {
  controllers: [EmployeeController, GetEmployeeController],
  cors: {
    origin: "http://localhost:5173",
  },
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
