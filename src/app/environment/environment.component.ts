import { Component, OnInit } from '@angular/core';
import { IEnvironment } from './environment.model';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss'],
})
export class EnvironmentComponent implements OnInit {
  public displayEnv: boolean = false;
  public selectedEnv: IEnvironment;

  constructor() {}

  ngOnInit(): void {}

  public openCreateOrEditEnvPanel(event: any) {
    try {
      if (event === 'New') {
        this.selectedEnv = null;
      } else {
        this.selectedEnv = event;
        this.selectedEnv;
      }
      this.displayEnv = true;
    } catch (error) {
      console.error('Error: [openCreateOrEditEnvPanel]');
    }
  }

  public onAfterSave(id: string) {
    try {
      this.closeEnvPanel();
    } catch (error) {
      console.error('Error: [onAfterSave]', error);
    }
  }

  private closeEnvPanel() {
    this.displayEnv = false;
    this.selectedEnv = null;
  }

  public onCloseEnvPanel($event) {
    this.closeEnvPanel();
  }
}
