import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { BackgroundsAgentsService } from "../../service/backgrounds-agents/backgrounds-agents.service";
import { FooterComponent } from "../footer/footer.component";
import { sanitize } from "sanitize-filename-ts";

@Component({
  selector: "app-agents-details",
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: "./agents-details.component.html",
  styleUrl: "./agents-details.component.css",
})
export class AgentsDetailsComponent implements OnInit {
  agent: any;
  agents: { id: string; name: string; background: string }[] = [];
  agentBg: string = "";
  selectedAbilityIndex: number = 0;
  currentIndex = 0;

  // prev/next agent
  prevAgent: any = null;
  nextAgent: any = null;

  constructor(
    private route: ActivatedRoute,
    private listAgentsService: ListAgentsService,
    private backgroundsAgentsService: BackgroundsAgentsService
  ) { }

  ngOnInit() {
    this.agents = this.backgroundsAgentsService.getBgAgents();

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");

      if (id) {
        this.listAgentsService.getAgentById(id).subscribe((data: any) => {
          this.agent = data;

          // genera i video
          const makeVideoPath = (agentName: string, abilityName: string) => {
            const base = sanitize(agentName.toLowerCase()).replace(/\s+/g, "-");
            const ability = sanitize(abilityName.toLowerCase()).replace(/\s+/g, "-");
            return `assets/videos/${base}-${ability}.mp4`;
          };

          this.agent.abilities = this.agent.abilities.map((ab: any) => ({
            ...ab,
            videoUrl: makeVideoPath(data.displayName, ab.displayName),
          }));

          // trova background usando UUID
          const matched = this.agents.find((a) => a.id === data.uuid);
          this.agentBg = matched?.background ?? "";

          // trova indice corrente basato su UUID
          this.currentIndex = this.agents.findIndex((a) => a.id === data.uuid);

          this.updatePrevNextAgents();
        });

      }
    });
  }

  selectAbility(i: number) {
    this.selectedAbilityIndex = i;
  }

  updatePrevNextAgents() {
    if (!this.agents.length) return;
    const len = this.agents.length;
    this.prevAgent = this.agents[(this.currentIndex - 1 + len) % len];
    this.nextAgent = this.agents[(this.currentIndex + 1) % len];
  }
}
