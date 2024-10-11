import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITabItem } from '../model/tab-nav.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tab-nav.component.html',
  styleUrl: './tab-nav.component.scss'
})

export class TabNavComponent {
  @Input() tabs: ITabItem[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  setActiveTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
