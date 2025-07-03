import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundsAgentsService {


  getBgAgents() {
    return [
      { name: "Astra", background: 'assets/bg-agents/Astra.png' },
      { name: "Breach", background: 'assets/bg-agents/Breach.png' },
      { name: "Brimstone", background: 'assets/bg-agents/Brim.png' },
      { name: "Chamber", background: 'assets/bg-agents/Chamber.png' },
      { name: "Clove", background: 'assets/bg-agents/Clove.png' },
      { name: "Cypher", background: 'assets/bg-agents/Cypher.png' },
      { name: "Deadlock", background: 'assets/bg-agents/Deadlock.png' },
      { name: "Fade", background: 'assets/bg-agents/Fade.png' },
      { name: "Gekko", background: 'assets/bg-agents/Gekko.png' },
      { name: "Harbor", background: 'assets/bg-agents/Harbor.png' },
      { name: "Iso", background: 'assets/bg-agents/Iso.png' },
      { name: "Jett", background: 'assets/bg-agents/Jett.png' },
      { name: "KAY/O", background: 'assets/bg-agents/Kayo.png' },
      { name: "Killjoy", background: 'assets/bg-agents/Killjoy.png'},
      { name: "Neon", background: 'assets/bg-agents/Neon.png' },
      { name: "Omen", background: 'assets/bg-agents/Omen.png' },
      { name: "Phoenix", background: 'assets/bg-agents/Phoenix.png' },
      { name: "Raze", background: 'assets/bg-agents/Raze.png' },
      { name: "Reyna", background: 'assets/bg-agents/Reyna.png' },
      { name: "Sage", background: 'assets/bg-agents/Sage.png' },
      { name: "Skye", background: 'assets/bg-agents/Skye.png' },
      { name: "Sova", background: 'assets/bg-agents/Sova.png' },
      { name: "Tejo", background: 'assets/bg-agents/Tejo.png' },
      { name: "Viper", background: 'assets/bg-agents/Viper.png' },
      { name: "Vyse", background: 'assets/bg-agents/Vyse.png' },
      { name: "Waylay", background: 'assets/bg-agents/Waylay.png' },
      { name: "Yoru", background: 'assets/bg-agents/Yoru.png' },
    ]
  }
}


