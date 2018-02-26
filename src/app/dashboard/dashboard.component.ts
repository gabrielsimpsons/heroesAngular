import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	heroes: Hero[];

  constructor(private heroService: HeroService, public messageService: MessageService) { }

  ngOnInit() {
  	this.getHeroes();
  }

  getHeroes(): void {
  	this.messageService.addMessage('Obteniendo héroes')
  	this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.messageService.addMessage(`Héroes obtenidos -> ${JSON.stringify(this.heroes)}`);
    });
  }

}
