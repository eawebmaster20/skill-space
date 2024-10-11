import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { TabNavComponent } from '../../../core/shared/tab-nav/tab-nav.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-career-programs',
  standalone: true,
  imports: [RouterModule, MatDividerModule, CommonModule, TabNavComponent],
  templateUrl: './career-programs.component.html',
  styleUrls: ['./career-programs.component.scss']
})
export class CareerProgramsComponent {
  activeTab: string = 'create';
  tabs = [
    { label: 'Career program creation', route: '/company/programs/create', value: 'create' },
    { label: 'Saved drafts', route: '/company/programs/drafts', value: 'drafts' },
    { label: 'Published programs', route: '/company/programs/published', value: 'published' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
