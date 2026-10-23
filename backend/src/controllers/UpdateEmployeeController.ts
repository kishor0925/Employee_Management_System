import {
  JsonController,
  Put,
  Param,
  Body,
} from "routing-controllers";
import { UpdateEmployeeService } from "../services/UpdateEmployeeService";

@JsonController("/employees")
export class UpdateEmployeeController {
  employeeService = new UpdateEmployeeService();

  @Put("/:id")
  async updateEmployee(
    @Param("id") id: number,
    @Body({ options: { limit: "10mb" } }) data: any
  ) {
    return this.employeeService.updateEmployee(Number(id), data);
  }
}