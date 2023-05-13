import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="active">
      <p-blockUI [blocked]="active">
        <p-progressSpinner></p-progressSpinner>
      </p-blockUI>
    </div>
  `,
})
export class ProgressLoader {
  @Input('active')
  public active: boolean = false;

  constructor() {}
}
