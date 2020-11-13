import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string): string {
    // Provided solution:
    // return value.replace('node_modules/place-my-order-assets', './assets');

    // Using regex to supply a solution for any other assets from any other packages found in node_modules
    return value.replace(/(node_modules\/.*?\/)/, `./assets/`);
  }
}
