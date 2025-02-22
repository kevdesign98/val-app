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
  // agents: Agents[] = DUMMY_AGENTS;

  items = [
    { label: 'Duelist', icon: 'pi pi-bolt', category: 'duelist' },
    { label: 'Controller', icon: 'pi pi-circle', category: 'controller' },
    { label: 'Sentinel', icon: 'pi pi-shield', category: 'sentinel' },
    { label: 'Initiator', icon: 'pi pi-lightbulb', category: 'initiator' }
  ];

  selectedCategory = 'duelist';

  agents = [
    { name: 'Jett', category: 'duelist' },
    { name: 'Phoenix', category: 'duelist' },
    { name: 'Omen', category: 'controller' },
    { name: 'Brimstone', category: 'controller' },
    { name: 'Sage', category: 'sentinel' },
    { name: 'Killjoy', category: 'sentinel' },
    { name: 'Sova', category: 'initiator' },
    { name: 'Breach', category: 'initiator' }
  ];

  get filteredAgents() {
    return this.agents.filter(agent => agent.category === this.selectedCategory);
  }

  onTabChange(event: any) {
    this.selectedCategory = this.items[event.index].category;
  }
}
 
