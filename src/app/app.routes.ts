import { Routes } from "@angular/router";
import { ListAgentComponent } from "./components/agents/list-agent/list-agent.component";
import { HomeComponent } from "./components/home/home.component";
import { ListMapsComponent } from "./components/maps/list-maps/list-maps.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "list-agents", component: ListAgentComponent },
  { path: "list-maps", component: ListMapsComponent }
];
