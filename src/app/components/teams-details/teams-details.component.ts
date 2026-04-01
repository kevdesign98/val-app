// import { CommonModule } from "@angular/common";
// import { Component, OnInit } from "@angular/core";
// import { NavbarComponent } from "../navbar/navbar.component";
// import { FooterComponent } from "../footer/footer.component";
// import { TeamsServicesService } from "../../service/teams-services/teams-services.service";
// @Component({
//   selector: "app-teams-details",
//   standalone: true,
//   imports: [CommonModule, NavbarComponent, FooterComponent],
//   templateUrl: "./teams-details.component.html",
//   styleUrl: "./teams-details.component.css",
// })


// export class TeamsDetailsComponent implements OnInit {
//   allTeamsRaw: any[] = [];
//   filteredTeams: any[] = [];
//   activeTeam: any = null;
//   activeRoster: any[] = [];
//   currentRegion = "EMEA";

//   constructor(private teamserviceService: TeamsServicesService) { }

//   ngOnInit() {
//     this.teamserviceService.getAllTeams().subscribe({
//       next: (res) => {
//         if (res.status === "OK") {
//           this.allTeamsRaw = res.data;
//           this.filterByRegion("EMEA");
//         }
//       },
//     });
//   }

//   filterByRegion(region: string) {
//     this.currentRegion = region;

//     this.filteredTeams = this.allTeamsRaw.filter((team) => {
//       const country = team.country;
//       if (region === "EMEA") {
//         return (
//           country === "Europe" ||
//           country === "Turkey" ||
//           country === "Czech Republic"
//         );
//       }
//       if (region === "AMERICAS") {
//         return country === "United States" || country === "Brazil";
//       }
//       if (region === "PACIFIC") {
//         return (
//           country === "South Korea" ||
//           country === "Singapore" ||
//           country === "Thailand" ||
//           country === "Indonesia"
//         );
//       }
//       return false;
//     });

//     if (this.filteredTeams.length > 0) {
//       this.selectTeam(this.filteredTeams[0]);
//     }
//   }

//   selectTeam(team: any) {
//     if (!team) return;

//     this.activeTeam = team;
//     this.activeRoster = [];

//     this.teamserviceService.getTeamDetail(team.id).subscribe({
//       next: (res) => {
//         if (res?.status === 'OK' && res?.data?.players) {
//           this.activeRoster = res.data.players;
//         }
//       },
//       error: (err) => {
//         console.error('Errore nel caricamento roster:', err);
//         this.activeRoster = [];
//       }
//     });
//   }
// }

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
  allTeamsRaw: any[] = [];
  filteredTeams: any[] = [];
  activeTeam: any = null;
  activeRoster: any[] = [];
  currentRegion = "EMEA";
  isLoadingRoster = false;

  constructor(private teamserviceService: TeamsServicesService) { }

  ngOnInit() {
    this.teamserviceService.getAllTeams().subscribe({
      next: (res) => {
        if (res.status === "OK") {
          this.allTeamsRaw = res.data;
          this.filterByRegion("EMEA");
        }
      },
    });
  }

  filterByRegion(region: string) {
    this.currentRegion = region;

    this.filteredTeams = this.allTeamsRaw.filter((team) => {
      const country = team.country;
      if (region === "EMEA") {
        return ["Europe", "Turkey", "Czech Republic", "France", "Spain", "Germany"].includes(country);
      }
      if (region === "AMERICAS") {
        return ["United States", "Brazil", "Canada", "Argentina", "Chile"].includes(country);
      }
      if (region === "PACIFIC") {
        return ["South Korea", "Singapore", "Thailand", "Indonesia", "Japan", "Philippines", "India"].includes(country);
      }
      return false;
    });

    if (this.filteredTeams.length > 0) {
      this.selectTeam(this.filteredTeams[0]);
    } else {
      this.activeTeam = null;
      this.activeRoster = [];
    }
  }

  selectTeam(team: any) {
    if (!team) return;

    this.activeTeam = team;
    this.activeRoster = [];
    this.isLoadingRoster = true;

    this.teamserviceService.getTeamDetail(team.id).subscribe({
      next: (res) => {
        if (res?.status === 'OK' && res?.data?.players) {
          this.activeRoster = res.data.players;
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