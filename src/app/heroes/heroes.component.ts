import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 
  heroes: Hero[];

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    console.log(`Hero to be selected ${JSON.stringify(hero)}`)
  	this.selectedHero = hero;
  }
  
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    console.log('Fetching heroes')
    this.heroService.getHeroes().subscribe(heroes => {console.log(`Héroes obtenidos: ${JSON.stringify(heroes)}`); this.heroes = heroes});
  }

  add(heroName: string): void {
    heroName = heroName.trim();
    if(!heroName) { return; }
    console.log(`Adding hero -> ${heroName}`);
    
    this.heroService.addHero({ name: heroName } as Hero)
          .subscribe(hero => {
            this.getHeroes()
          });
  }


}
