import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Agent } from "node:http";
import { NavbarComponent } from "../navbar/navbar.component";
import { BackgroundsAgentsService } from "../../service/backgrounds-agents/backgrounds-agents.service";

@Component({
  selector: "app-agents-details",
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: "./agents-details.component.html",
  styleUrl: "./agents-details.component.css",
})

export class AgentsDetailsComponent implements OnInit {
  agent: any;
  agents: { name: string, background: string }[] = [];
  agentBg: string = '';

  constructor(
    private route: ActivatedRoute,
    private listAgentsService: ListAgentsService,
    private backgroundsAgentsService: BackgroundsAgentsService
  ) { }

  ngOnInit() {
    this.agents = this.backgroundsAgentsService.getBgAgents();

    const id = this.route.snapshot.paramMap.get("id");
    this.listAgentsService.getAgentById(id ?? '').subscribe((data: any) => {
      this.agent = data;
      const matched = this.agents.find(a => a.name === data.displayName);
      this.agentBg = matched?.background ?? '';
    });
  }
}
