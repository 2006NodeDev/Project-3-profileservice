import { EmployeeAssignment } from "./EmployeeAssignment";
import { AssociateAssignment } from "./AssociateAssignment";

export class Batch {
    
    batchId: string
    name: string
    startDate: string
    endDate: string
    skill: string
    location: string
    type: string
    goodGrade: number
    passingGrade: number
    employeeAssignments:EmployeeAssignment[]
    associateAssignments:AssociateAssignment[]
    currentWeek: number
}