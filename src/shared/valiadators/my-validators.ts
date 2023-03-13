import {FormControl} from '@angular/forms';

export class MyValidators {
  static spacesVal(control: FormControl): { [key: string]: boolean } | null {
    if (control.value?.trim() === '') {
      return { spacesOnly: true };
    }
    return null;
  }
}
