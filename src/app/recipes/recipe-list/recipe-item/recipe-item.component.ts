import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  @Input() index: number;
  subscription: Subscription;
  editMode: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(this.index);

    this.subscription = this.recipeService.editModeChanged
        .subscribe((result: boolean) => {
          this.editMode = result;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
