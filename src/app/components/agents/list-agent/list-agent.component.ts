import { Component } from '@angular/core';
import { Agents } from '../../../models/agents';
import { DUMMY_AGENTS } from '../../../dummy-agents';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-agent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-agent.component.html',
  styleUrl: './list-agent.component.css'
})
export class ListAgentComponent {
  agents: Agents[] = DUMMY_AGENTS;
}
