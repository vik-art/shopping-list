import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "price"
})

export class PricePipe implements PipeTransform{
    transform(value: number) {
        return Number((value).toFixed(2));
    }
    
}