import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-agents",
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: "./agents.component.html",
  styleUrl: "./agents.component.css"
})
export class AgentsComponent implements OnInit {
  agents: any[] = [];
  filteredAgents: any[] = [];
  roles: string[] = ["All", "Sentinel", "Initiator", "Controller", "Duelist"];
  selectedRole: string = "All";

  constructor(private listAgentsService: ListAgentsService) { }

  ngOnInit() {
    this.listAgentsService.getAgents().subscribe((data) => {
      // 1. Ordinamento alfabetico
      const sortedAgents = data.data.sort((a: any, b: any) =>
        a.displayName.localeCompare(b.displayName)
      );

      // 2. Rimozione duplicati
      const uniqueAgents = sortedAgents.filter(
        (agent: any, index: number, self: any[]) =>
          index === self.findIndex((a) => a.displayName === agent.displayName)
      );

      // 3. Mapping dei dati
      this.agents = uniqueAgents.map((agent: any) => ({
        ...agent,
        imageName:
          agent.displayName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".png",
      }));

      this.filteredAgents = this.agents;
    });
  }

  filterByRole(role: string) {
    this.selectedRole = role;
    if (role === "All") {
      this.filteredAgents = this.agents;
    } else {
      this.filteredAgents = this.agents.filter(
        (agent) => agent.role?.displayName?.toLowerCase() === role.toLowerCase()
      );
    }
  }
}
