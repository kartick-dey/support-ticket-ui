import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IEnvironment } from 'app/environment/environment.model';

@Component({
  selector: 'app-environment-create',
  templateUrl: './environment-create.component.html',
  styleUrls: ['./environment-create.component.scss'],
})
export class EnvironmentCreateComponent implements OnChanges {
  public envForm: FormGroup;

  @Output() close = new EventEmitter<any>();
  @Output() afterSave = new EventEmitter<any>();

  @Input() envData: IEnvironment = null;

  public isEdit: boolean = false;

  constructor() {
    this.createEnvForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.envData) {
      this.isEdit = true;
      this.patchFormValue();
    } else {
      this.isEdit = false;
    }
  }

  private patchFormValue() {
    // this.envForm.patchValue(this.envData);
  }

  private createEnvForm() {
    this.envForm = new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
      // emailToWatch: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      // Address
      // street: new FormControl(''),
      // city: new FormControl(''),
      // state: new FormControl(''),
      // zip: new FormControl(''),
      // country: new FormControl(''),
    });
  }

  public onSave() {
    this.afterSave.emit(null);
  }

  public onCancel() {
    this.close.emit()
  }
}
