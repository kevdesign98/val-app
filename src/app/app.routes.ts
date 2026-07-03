import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AgentsComponent } from "./components/agents/agents.component";
import { MapsComponent } from "./pages/maps/maps.component";
import { StatsComponent } from "./pages/stats/stats.component";
import { AgentsDetailsComponent } from "./components/agents-details/agents-details.component";
import { MapStratComponent } from "./components/map-strat/map-strat.component";
import { WeaponsComponent } from "./pages/weapons/weapons.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ListMatchesComponent } from "./components/list-matches/list-matches.component";
import { EsportsComponent } from "./pages/esports/esports.component";
import { TeamsDetailsComponent } from "./components/teams-details/teams-details.component";
import { AgentsListDashboardComponent } from "./pages/agents-list-dashboard/agents-list-dashboard.component";
import { WeaponsListDashboardComponent } from "./pages/weapons-list-dashboard/weapons-list-dashboard.component";
import { MatchesDashboardComponent } from "./pages/matches-dashboard/matches-dashboard.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";

export const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent, title: 'ValApp - AI Coach & Tracker per Valorant' },
  { path: "agents", component: AgentsComponent, title: 'Agenti - ValApp' },
  { path: "weapons", component: WeaponsComponent, title: 'Armi - ValApp' },
  { path: "maps", component: MapsComponent, title: 'Mappe - ValApp' },
  { path: "list-matches", component: ListMatchesComponent, title: 'Partite - ValApp' },
  { path: "stats", component: StatsComponent, title: 'Statistiche - ValApp' },
  { path: "agents/:id", component: AgentsDetailsComponent, title: 'Dettagli Agente - ValApp' },
  { path: "maps-strat/:uuid", component: MapStratComponent, title: 'Strategie Mappa - ValApp' },
  { path: "signup", component: SignupComponent, title: 'Registrazione - ValApp' },
  { path: "dashboard", component: DashboardComponent, title: 'Dashboard - ValApp' },
  { path: "login", component: LoginComponent, title: 'Login - ValApp' },
  { path: "esports", component: EsportsComponent, title: 'Esports - ValApp' },
  { path: "teams-details", component: TeamsDetailsComponent, title: 'Dettagli Squadra - ValApp' },
  { path: "privacy", component: PrivacyComponent, title: 'Privacy & Cookie Policy - ValApp' },

  { path: "dashboard/agents-list-dashboard", component: AgentsListDashboardComponent, title: 'Agenti - ValApp' },
  { path: "dashboard/weapons-list-dashboard", component: WeaponsListDashboardComponent, title: 'Armi - ValApp' },
  { path: "dashboard/matches-dashboard", component: MatchesDashboardComponent, title: 'Partite - ValApp' },
  { path: 'dashboard/matches/:name/:tag', component: MatchesDashboardComponent, title: 'Partite - ValApp' },
  { path: "**", component: NotFoundComponent, title: '404 - Pagina non trovata' },
];
