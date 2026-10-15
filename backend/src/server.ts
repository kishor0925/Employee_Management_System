import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import cors from "cors";
import { EmployeeController } from "./controllers/EmployeeController";
import {GetEmployeeController} from "./controllers/GetEmployeeController";

const app = createExpressServer({
  controllers: [EmployeeController, GetEmployeeController],
  cors: {
    origin: "http://localhost:5173",
  },
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});