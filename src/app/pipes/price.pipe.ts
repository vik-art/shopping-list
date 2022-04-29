import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "price"
})

export class PricePipe implements PipeTransform{
    transform(value: number | null) {
        if(value) {
        return Number((value).toFixed(2));
        } else {
            return 0;
        }
    }
    
}