import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TeamsServicesService } from "../../service/teams-services/teams-services.service";
@Component({
  selector: "app-teams-details",
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: "./teams-details.component.html",
  styleUrl: "./teams-details.component.css",
})
export class TeamsDetailsComponent implements OnInit {
  allTeamsRaw: any[] = []; // Qui salviamo i dati grezzi dall'API
  filteredTeams: any[] = []; // Qui i team filtrati per regione
  activeTeam: any = null;
  activeRoster: any[] = [];
  currentRegion = "EMEA";

  constructor(private teamserviceService: TeamsServicesService) {}

  ngOnInit() {
    this.teamserviceService.getAllTeams().subscribe({
      next: (res) => {
        // Nota: l'API restituisce "OK", non "success" come avevamo scritto prima
        if (res.status === "OK") {
          this.allTeamsRaw = res.data;
          this.filterByRegion("EMEA"); // Filtriamo subito per la prima regione
        }
      },
    });
  }

  filterByRegion(region: string) {
    this.currentRegion = region;

    // Logica di mappatura: l'API usa i paesi, noi li raggruppiamo per VCT Region
    this.filteredTeams = this.allTeamsRaw.filter((team) => {
      const country = team.country;
      if (region === "EMEA") {
        return (
          country === "Europe" ||
          country === "Turkey" ||
          country === "Czech Republic"
        );
      }
      if (region === "AMERICAS") {
        return country === "United States" || country === "Brazil";
      }
      if (region === "PACIFIC") {
        return (
          country === "South Korea" ||
          country === "Singapore" ||
          country === "Thailand" ||
          country === "Indonesia"
        );
      }
      return false;
    });

    // Seleziona il primo team della nuova lista filtrata
    if (this.filteredTeams.length > 0) {
      this.selectTeam(this.filteredTeams[0]);
    }
  }

selectTeam(team: any) {
  if (!team) return;

  this.activeTeam = team;
  this.activeRoster = []; // Reset immediato per evitare che il vecchio roster si sovrapponga

  this.teamserviceService.getTeamDetail(team.id).subscribe({
    next: (res) => {
      // Usiamo il controllo '?' per navigare l'oggetto in sicurezza
      if (res?.status === 'OK' && res?.data?.players) {
        this.activeRoster = res.data.players;
      }
    },
    error: (err) => {
      console.error('Errore nel caricamento roster:', err);
      this.activeRoster = []; // In caso di errore, svuota la lista
    }
  });
}
}
