import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  editMode: boolean = false;
  private recipeChangedSubscription: Subscription;
  private editModeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeChangedSubscription = this.recipeService.recipeChanged
        .subscribe(() => {
          this.recipes = this.recipeService.getRecipes();
        });

    this.editModeChangedSubscription = this.recipeService.editModeChanged
        .subscribe((result: boolean) => {
          this.editMode = result;
        });
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe();
    this.editModeChangedSubscription.unsubscribe();
  }
}
