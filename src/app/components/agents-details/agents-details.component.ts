import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Agent } from "node:http";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-agents-details",
  standalone: true,
  imports: [CommonModule,NavbarComponent ],
  templateUrl: "./agents-details.component.html",
  styleUrl: "./agents-details.component.css",
})

export class AgentsDetailsComponent implements OnInit {
  agent: any;

  constructor(
    private route: ActivatedRoute,
    private listAgentsService: ListAgentsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.listAgentsService.getAgentById(id ?? '').subscribe((data:Agent) => {
      this.agent = data;
    });
  }
}
