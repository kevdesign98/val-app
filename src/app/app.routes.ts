import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AgentsComponent } from "./components/agents/agents.component";
import { WeaponsComponent } from "./pages/weapons/weapons.component";
import { MapsComponent } from "./pages/maps/maps.component";
import { StatsComponent } from "./pages/stats/stats.component";
import { AgentsDetailsComponent } from "./components/agents-details/agents-details.component";
import { MapStratComponent } from "./components/map-strat/map-strat.component";

export const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent },
  { path: "agents", component: AgentsComponent },
  { path: "weapons", component: WeaponsComponent },
  { path: "maps", component: MapsComponent },
  { path: "stats", component: StatsComponent },
  { path: "agents/:id", component: AgentsDetailsComponent },
  { path: "maps/:slug", component: MapStratComponent },
  { path: '**', redirectTo: '' }
];
