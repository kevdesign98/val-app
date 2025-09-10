import { Component, OnInit } from "@angular/core";
import { ListAgentsService } from "../../service/list-agents.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { BackgroundsAgentsService } from "../../service/backgrounds-agents/backgrounds-agents.service";
import { FooterComponent } from "../footer/footer.component";
import { sanitize } from 'sanitize-filename-ts';

@Component({
  selector: "app-agents-details",
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: "./agents-details.component.html",
  styleUrl: "./agents-details.component.css",
})
export class AgentsDetailsComponent implements OnInit {
  agent: any;
  agents: { name: string; background: string }[] = [];
  agentBg: string = "";
  selectedAbilityIndex: number = 0;
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private listAgentsService: ListAgentsService,
    private backgroundsAgentsService: BackgroundsAgentsService
  ) { }

  ngOnInit() {
    this.agents = this.backgroundsAgentsService.getBgAgents();

    const id = this.route.snapshot.paramMap.get("id");
    this.listAgentsService.getAgentById(id ?? "").subscribe((data: any) => {
      this.agent = data;

      // 🔹 funzione per pulire i nomi (stesso formato dei file rinominati)
      const normalizeName = (name: string) =>
        sanitize(name.toLowerCase())
          .replace(/\s+/g, "-")       // spazi → trattini
          .replace(/\//g, "")         // rimuove slash
          .replace(/['’]/g, "")       // rimuove apostrofi
          .replace(/[^a-z0-9-]/g, ""); // rimuove caratteri strani

      // 🔹 genera path video
      const makeVideoPath = (agentName: string, abilityName: string) => {
        const base = normalizeName(agentName);
        const ability = normalizeName(abilityName);
        return `assets/videos/${base}-${ability}.mp4`;
      };

      // 🔹 aggiungiamo `videoUrl` ad ogni abilità
      this.agent.abilities = this.agent.abilities.map((ab: any) => ({
        ...ab,
        videoUrl: makeVideoPath(data.displayName, ab.displayName),
      }));

      // sfondo agent
      const matched = this.agents.find((a) => a.name === data.displayName);
      this.agentBg = matched?.background ?? "";

      // indice agente corrente
      this.currentIndex = this.agents.findIndex(
        (a) => a.name === data.displayName
      );

      // debug: stampa i video generati
      console.log(
        `🎥 Video per ${data.displayName}:`,
        this.agent.abilities.map((a: any) => a.videoUrl)
      );
    });
  }

  selectAbility(i: number) {
    this.selectedAbilityIndex = i;
  }
}
