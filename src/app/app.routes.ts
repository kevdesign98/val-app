import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AgentsComponent } from "./components/agents/agents.component";
import { MapsComponent } from "./pages/maps/maps.component";
import { StatsComponent } from "./pages/stats/stats.component";
import { AgentsDetailsComponent } from "./components/agents-details/agents-details.component";
import { MapStratComponent } from "./components/map-strat/map-strat.component";
import { EsportsComponent } from "./components/esports/esports.component";
import { WeaponsComponent } from "./pages/weapons/weapons.component";

export const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent },
  { path: "agents", component: AgentsComponent },
  { path: "weapons", component: WeaponsComponent },
  { path: "maps", component: MapsComponent },
  { path: "esports", component: EsportsComponent },
  { path: "stats", component: StatsComponent },
  { path: "agents/:id", component: AgentsDetailsComponent },
  { path: 'maps-strat/:uuid', component: MapStratComponent },
  { path: '', redirectTo: 'maps', pathMatch: 'full' },
  { path: '**', redirectTo: 'maps' }
];
