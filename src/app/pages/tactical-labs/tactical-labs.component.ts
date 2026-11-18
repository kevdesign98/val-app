import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { MeterGroupModule } from 'primeng/metergroup';
import { TimelineModule } from 'primeng/timeline';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TacticalService } from '../../service/tactical-services/tactical.service';

@Component({
  selector: 'app-tactical-labs',
  imports: [CommonModule, TabsModule, ChartModule, MeterGroupModule, TimelineModule, SidebarComponent],
  templateUrl: './tactical-labs.component.html',
  styleUrl: './tactical-labs.component.css',
})
export class TacticalLabsComponent implements OnInit {
  tacticalFlaws: any[] = [];
  radarData: any;
  radarOptions: any;
  trainingSteps: any[] = [];

  // Nuove proprietà per le Mappe e l'Anatomia Balistica
  mapChartData: any;
  mapChartOptions: any;
  accuracyChartData: any;
  accuracyChartOptions: any;

  // Oggetto per gestire i valori testuali accoppiati al grafico a ciambella
  accuracyStats = {
    head: 32,
    body: 54,
    leg: 14
  };

  // Dati mockup per il tracciatore spaziale/heatmap della mappa selezionata
  selectedLabMapData = {
    name: 'Bind',
    imageUrl: 'https://media.valorant-api.com/maps/7eae2356-43c2-4a21-e134-e582e4778e68/splash.png'
  };

  // Iniezione del servizio mantenendo pulito il componente
  constructor(private tacticalService: TacticalService) { }

  ngOnInit(): void {
    this.initTacticalFlaws();
    this.initRadarChart();
    this.initTrainingTimeline();
    this.initMapPerformanceChart();
    this.initAccuracyChart();

    // Esecuzione del caricamento dei dati dal service
    this.loadRealData();
  }

  private loadRealData(): void {
    const region = 'eu';
    const puuid = 'IL_TUO_PUUID_REALE'; // Inserisci qui il tuo PUUID o recuperalo dinamicamente

    this.tacticalService.getAdvancedTacticalStats(region, puuid).subscribe({
      next: (data) => {
        // 1. Aggiornamento dell'accuratezza balistica testuale e del grafico
        this.accuracyStats.head = data.accuracy.head;
        this.accuracyStats.body = data.accuracy.body;
        this.accuracyStats.leg = data.accuracy.leg;

        this.accuracyChartData = {
          ...this.accuracyChartData,
          datasets: [{
            ...this.accuracyChartData.datasets[0],
            data: [data.accuracy.head, data.accuracy.body, data.accuracy.leg]
          }]
        };

        // 2. Aggiornamento dinamico delle performance per mappa basato sui match analizzati
        const updatedLabels = data.maps.map((m: any) => m.name);
        const updatedWinRates = data.maps.map((m: any) => m.winRate);

        this.mapChartData = {
          labels: updatedLabels,
          datasets: [{
            ...this.mapChartData.datasets[0],
            data: updatedWinRates
          }]
        };
      },
      error: (err) => {
        console.error('Errore nel caricamento dei dati tattici real-time:', err);
      }
    });
  }

  private initTacticalFlaws() {
    this.tacticalFlaws = [
      { label: 'Crosshair Placement', value: 40, color: '#6366f1', icon: 'pi pi-target' },
      { label: 'Recoil Management', value: 30, color: '#f43f5e', icon: 'pi pi-bolt' },
      { label: 'Decision Making', value: 30, color: '#10b981', icon: 'pi pi-sliders-h' }
    ];
  }

  private initRadarChart() {
    this.radarData = {
      labels: ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
      datasets: [
        {
          label: 'Your Playstyle Affinity',
          borderColor: '#6366f1',
          pointBackgroundColor: '#6366f1',
          pointHoverBorderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          data: [85, 40, 60, 35]
        }
      ]
    };
    this.radarOptions = {
      plugins: {
        legend: { display: false }
      },
      scales: {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: { size: 11, family: 'monospace', weight: 'bold' }
          },
          ticks: { display: false }
        }
      }
    };
  }

  private initTrainingTimeline() {
    this.trainingSteps = [
      { title: 'Step 1: Deathmatch Iso', desc: 'Focus solo sulle shortcut del mirino ad altezza testa senza sparare in full-auto.', status: 'todo' },
      { title: 'Step 2: Custom Map Utility', desc: 'Impara 2 line-up fondamentali di Omen su Ascent per bloccare i rush in A.', status: 'todo' },
      { title: 'Step 3: VOD Review', desc: 'Analizza i primi 15 secondi dei round in cui sei morto per primo.', status: 'todo' }
    ];
  }

  private initMapPerformanceChart() {
    // Configurazione grafico a barre per il Win-Rate suddiviso per mappa
    this.mapChartData = {
      labels: ['Bind', 'Ascent', 'Haven', 'Split', 'Sunset'],
      datasets: [
        {
          label: 'Win Rate (%)',
          backgroundColor: 'rgba(99, 102, 241, 0.75)', // Indigo semi-trasparente
          borderColor: '#6366f1',
          borderWidth: 1,
          borderRadius: 8,
          data: [62, 45, 58, 40, 70]
        }
      ]
    };

    this.mapChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: { family: 'monospace', size: 10 }
          }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          min: 0,
          max: 100,
          ticks: {
            color: 'rgba(255, 255, 255, 0.4)',
            font: { family: 'monospace', size: 10 },
            stepSize: 20
          }
        }
      }
    };
  }

  private initAccuracyChart() {
    // Configurazione grafico a ciambella per Head/Body/Leg accuracy
    this.accuracyChartData = {
      labels: ['Headshot', 'Bodyshot', 'Legshot'],
      datasets: [
        {
          data: [this.accuracyStats.head, this.accuracyStats.body, this.accuracyStats.leg],
          backgroundColor: [
            '#6366f1', // Indigo per la testa
            '#f59e0b', // Amber per il corpo
            '#f43f5e'  // Rose per le gambe
          ],
          borderWidth: 0,
          hoverOffset: 4
        }
      ]
    };

    this.accuracyChartOptions = {
      maintainAspectRatio: false,
      cutout: '75%', // Rende la ciambella molto sottile ed elegante
      plugins: {
        legend: { display: false } // Gestiamo le legende a testo nell'HTML
      }
    };
  }
}