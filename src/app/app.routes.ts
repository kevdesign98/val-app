import { Routes } from '@angular/router';
import { ListAgentComponent } from './agents/list-agent/list-agent.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:'list-agents', component:ListAgentComponent,},
];
