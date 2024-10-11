import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TabNavComponent } from '../../../core/shared/tab-nav/tab-nav.component';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule,RouterModule,MatDividerModule,TabNavComponent],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})

export class AssessmentComponent {
  activeTab: string = 'create';

  tabs = [
    { label: 'Skill quiz creation', route: '/company/assessment/create', value: 'create' },
    { label: 'Local repository', route: '/company/assessment/local-repository', value: 'local-repository' },
    { label: 'Global repository', route: '/company/assessment/global-repository', value: 'global-repository' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
