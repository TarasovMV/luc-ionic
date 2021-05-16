import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'categorySplit'
})
export class CategorySplitPipe implements PipeTransform {

    transform(value: string): string {
        const categoryArray = value.split('/');
        return categoryArray[categoryArray.length - 1];
    }

}
