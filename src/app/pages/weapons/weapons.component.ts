import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { WeaponsService } from '../../service/weapons-services/weapons.service';

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent implements OnInit {
  categories = ["Sidearms", "SMGs", "Rifles", "Shotguns", "Sniper Rifles", "Machine Guns"];
  weapons: any[] = [];
  selectedCategory: string = "Sidearms";
  filteredWeapons: any[] = [];
  selectedWeapon: any = null;

  // salva la skin equipaggiata per ogni arma
  selectedSkins: { [weaponUuid: string]: any } = {};

  constructor(private weaponsService: WeaponsService) { }

  ngOnInit(): void {
    this.weaponsService.getWeapons().subscribe((res) => {
      this.weapons = res;
      this.filterByCategory(this.selectedCategory);
    });
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filterByCategory(cat);
  }

  filterByCategory(cat: string) {
    const map: Record<string, string> = {
      "Sidearms": "EEquippableCategory::Sidearm",
      "SMGs": "EEquippableCategory::SMG",
      "Rifles": "EEquippableCategory::Rifle",
      "Shotguns": "EEquippableCategory::Shotgun",
      "Sniper Rifles": "EEquippableCategory::Sniper",
      "Machine Guns": "EEquippableCategory::Heavy"
    };

    const apiCategory = map[cat];
    this.filteredWeapons = this.weapons.filter((w: any) => w.category === apiCategory);
  }

  // apre/chiude la lista delle skin per un’arma
  toggleSkins(weapon: any) {
    if (this.selectedWeapon === weapon) {
      this.selectedWeapon = null; // chiudi
    } else {
      this.selectedWeapon = weapon; // apri
    }
  }

  // equipaggia la skin scelta per quell’arma
  equipSkin(weaponUuid: string, skin: any) {
    this.selectedSkins[weaponUuid] = skin;
  }
}