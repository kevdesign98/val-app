import { Component } from '@angular/core';
import { Agents } from '../../../models/agents';
import { DUMMY_AGENTS } from '../../../dummy-agents';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-list-agent',
  standalone: true,
  imports: [CommonModule,TabMenuModule,ButtonModule,CardModule],
  templateUrl: './list-agent.component.html',
  styleUrl: './list-agent.component.css'
})
export class ListAgentComponent {
  agents: Agents[] = DUMMY_AGENTS;

  items =[
    {label:'Duelist',icon:'pi pi-users'},
    {label:'Initiator',icon:'pi pi-users'},
    {label:'Controller',icon:'pi pi-users'},
    {label:'Sentinel',icon:'pi pi-users'},
  ]

  activeTab = 'Home';

  onTabChange(event: any) {
    this.activeTab = this.items[event.index].label;
  }
}
 
