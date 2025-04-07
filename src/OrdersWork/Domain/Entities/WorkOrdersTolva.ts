import {WorkOrder,OrderPropeties} from "./WorkOrders";


interface Tolva {
    steel:string,
    skates:string,
    axes:string,
    suspension:string,
    domes:string,
    

}

export class OrderWorkTolva extends WorkOrder {
    constructor(
        mandatoryOrder:OrderPropeties,
        public Properties:Tolva
    ){
        super(mandatoryOrder);
    }
}