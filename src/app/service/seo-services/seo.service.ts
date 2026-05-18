import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) { }

  generateTags(config: { title: string; description: string; image?: string; robots?: string }) {
    this.titleService.setTitle(`${config.title} | ValApp`);
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ name: 'robots', content: config.robots || 'index, follow' });

    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:image', content: config.image || 'https://valapp.it/assets/logo-va.png' });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
}
