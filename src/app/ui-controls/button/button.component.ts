import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  buttonType: buttonType | undefined;

  @Input() label: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}

export type buttonType = 'outline' | 'normal' | 'icon';
