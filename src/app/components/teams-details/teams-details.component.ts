
import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TeamsServicesService } from "../../service/teams-services/teams-services.service";

@Component({
  selector: "app-teams-details",
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: "./teams-details.component.html",
  styleUrl: "./teams-details.component.css"
})

export class TeamsDetailsComponent implements OnInit {
  filteredTeams: any[] = [];
  activeTeam: any = null;
  activeRoster: any[] = [];
  currentRegion = "EMEA";
  isLoadingRoster = false;
  isLoadingTeams = false; // Aggiunto per feedback visivo

  constructor(private teamserviceService: TeamsServicesService) { }

  ngOnInit() {
    this.filterByRegion("EMEA");
  }

  filterByRegion(region: string) {
    this.currentRegion = region;
    this.filteredTeams = [];
    this.activeTeam = null;

    this.teamserviceService.getAllTeams(region).subscribe({
      next: (res) => {
        // FIX: L'API usa la chiave "teams" e non "data"
        if (res && res.teams) {
          this.filteredTeams = res.teams;

          if (this.filteredTeams.length > 0) {
            this.selectTeam(this.filteredTeams[0]);
          }
        } else if (res && res.data) {
          // Fallback nel caso alcune rotte usino ancora "data"
          this.filteredTeams = res.data;
        }
      },
      error: (err) => {
        console.error(`Errore nel caricamento dei team:`, err);
      }
    });
  }

  selectTeam(team: any) {
    if (!team) return;

    this.activeTeam = team;
    this.activeRoster = [];
    this.isLoadingRoster = true;

    this.teamserviceService.getTeamDetail(team.id).subscribe({
      next: (res) => {
        // Alcuni team nell'API usano 'players', altri 'members'
        if (res?.status === 'OK') {
          this.activeRoster = res.data.players || res.data.members || [];
        }
        this.isLoadingRoster = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento roster:', err);
        this.activeRoster = [];
        this.isLoadingRoster = false;
      }
    });
  }
}