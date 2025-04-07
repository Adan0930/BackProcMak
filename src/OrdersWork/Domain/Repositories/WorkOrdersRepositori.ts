import { WorkOrder } from "../Entities/WorkOrders";

export interface WorkOrderRepository{
    savedOW(workOrder:WorkOrder):Promise<WorkOrder>;
    callId(IdWorkOrder:string):Promise<WorkOrder | null>;
}