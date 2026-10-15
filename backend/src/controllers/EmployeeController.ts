
import { JsonController, Post, Body, HttpCode } from "routing-controllers";
import { EmployeeService } from "../services/EmployeeService";

@JsonController("/employees")
export class EmployeeController {
  private employeeService = new EmployeeService();

  @Post("/onboard")
  @HttpCode(201)
  async createEmployee(@Body() data: any) {
    try {
      const result = await this.employeeService.createEmployee(data);

      return {
        message: "Employee onboarded successfully",
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }
}
