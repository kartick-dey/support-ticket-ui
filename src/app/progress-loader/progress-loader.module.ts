import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressLoader } from './progress-loader.component';

@NgModule({
  declarations: [ProgressLoader],
  imports: [CommonModule, BlockUIModule, ProgressSpinnerModule],
  exports: [ProgressLoader],
})
export class ProgressLoaderModule {}
