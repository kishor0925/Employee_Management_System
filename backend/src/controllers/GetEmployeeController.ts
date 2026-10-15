import {
  JsonController,
  Get,
  Delete,
  Param,
  HttpError,
} from "routing-controllers";

import GetEmployeeService from "../services/GetEmployeeService";

const getEmployeeService = new GetEmployeeService();

@JsonController("/employees")
export class GetEmployeeController {
  @Get("/")
  async getEmployees() {
    return getEmployeeService.getEmployees();
  }

  @Get("/:id")
  async getEmployeeById(@Param("id") id: number) {
    const employee = await getEmployeeService.getEmployeeById(id);

    if (!employee) {
      throw new HttpError(404, "Employee not found");
    }

    return employee;
  }

  @Delete("/:id")
  async deleteEmployee(@Param("id") id: number) {
    const employee = await getEmployeeService.deleteEmployee(id);

    if (!employee) {
      throw new HttpError(404, "Employee not found");
    }

    return employee;
  }
}