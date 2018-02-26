import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {

	@Input() hero: Hero;

	heroImageUrl: string;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(`Hero to be searched ${JSON.stringify(id)}`)
    if(id)
      this.heroService.getHero(id)
        .subscribe(hero => {
          console.log(`Hero -> ${JSON.stringify(hero)}`);
          if(hero) this.hero = hero;
        });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log(`Updating -> ${JSON.stringify(this.hero)}`)
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  deleteHero() : void {
    this.heroService.deleteHero(this.hero).subscribe(() => this.goBack());
  }

  // This component makes a request but it can't actually delete a hero.
	//deleteRequest = new EventEmitter<Hero>();
/*
	delete() {
  	this.deleteRequest.emit(this.hero);
	}
*/
}
