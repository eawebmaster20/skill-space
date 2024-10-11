import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomTimelineComponent } from '../../../core/shared/custom-timeline/custom-timeline.component';
import { CustomCheckBoxComponent } from '../../../core/shared/custom-check-box/custom-check-box.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-application-tracking',
  standalone: true,
  imports: [MatIconModule, CustomTimelineComponent, CustomCheckBoxComponent, FormsModule],
  templateUrl: './application-tracking.component.html',
  styleUrl: './application-tracking.component.scss'
})
export class ApplicationTrackingComponent {
  single!: boolean
  group!:boolean
  log(){
    console.log(this.single)
    console.log(this.group)
  }
}
