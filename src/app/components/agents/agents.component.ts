import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListAgentsService } from '../../service/list-agents.service';
//  import { Agents } from '../../models/agents';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})


export class AgentsComponent implements OnInit {

  agents: any[] = [];

  constructor(private listAgentsService: ListAgentsService) { }

  ngOnInit(): void {
    this.listAgentsService.getAgents().subscribe(data => {
      this.agents = data.data;
    });
  }
}
