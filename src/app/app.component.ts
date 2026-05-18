import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Lenis from 'lenis';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'val-app';

  ngOnInit() {
    // Initialize Vercel Speed Insights
    injectSpeedInsights();

    const lenis = new Lenis({
      duration: 1.2,      // Durata dello scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Funzione di easing "smooth"
      smoothWheel: true,
      wheelMultiplier: 1, // Sensibilità
    });

    // Loop per aggiornare Lenis ad ogni frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}