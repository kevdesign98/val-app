import { Component, HostListener, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";

import { ActivatedRoute, Route, Router } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { BackgroundsAgentsService } from "../../service/backgrounds-agents/backgrounds-agents.service";
import { FooterComponent } from "../footer/footer.component";
import { sanitize } from "sanitize-filename-ts";
import { GalleriaModule } from "primeng/galleria";

@Component({
  selector: "app-agents-details",
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    GalleriaModule
],
  templateUrl: "./agents-details.component.html",
  styleUrl: "./agents-details.component.css"
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
    private router: Router,
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
            const ability = sanitize(abilityName.toLowerCase()).replace(
              /\s+/g,
              "-"
            );
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

  goToPrevAgent() {
    if (!this.agents.length) return;
    const len = this.agents.length;
    this.currentIndex = (this.currentIndex - 1 + len) % len;
    const prev = this.agents[this.currentIndex];
    this.router.navigate(["/agents", prev.id]);
  }

  goToNextAgent() {
    if (!this.agents.length) return;
    const len = this.agents.length;
    this.currentIndex = (this.currentIndex + 1) % len;
    const next = this.agents[this.currentIndex];
    this.router.navigate(["/agents", next.id]);
  }

  showScrollBtn = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Appare dopo 300px di scroll
    this.showScrollBtn = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
