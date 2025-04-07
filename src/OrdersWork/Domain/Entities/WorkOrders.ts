export interface OrderPropeties {
    idWorkOrder:string,
    sellerId:number,
    clientId:number,
    modelId:number,
    date:Date,
}


export class WorkOrder{
    constructor(
        public mandatoryOrder: OrderPropeties
    ){}
};


console.log(WorkOrder);