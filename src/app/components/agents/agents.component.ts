import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
//  import { Agents } from '../../models/agents';

@Component({
  selector: "app-agents",
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: "./agents.component.html",
  styleUrl: "./agents.component.css",
})
export class AgentsComponent implements OnInit {
  agents: any[] = [];

  constructor(private listAgentsService: ListAgentsService) {}

  ngOnInit() {
    this.listAgentsService.getAgents().subscribe((data) => {
      // console.log("agenti", data);
      const sortedAgents = data.data.sort((a: any, b: any) =>
        a.displayName.localeCompare(b.displayName)
      );

      const uniqueAgents = sortedAgents.filter(
        (agent: any, index: number, self: any[]) =>
          index === self.findIndex((a) => a.displayName === agent.displayName)
      );

      this.agents = uniqueAgents.map((agent: any) => ({
        ...agent,
        imageName:
          agent.displayName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".png",
      }));
    });
  }
}
