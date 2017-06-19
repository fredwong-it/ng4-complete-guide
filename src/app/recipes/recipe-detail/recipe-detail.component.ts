import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params
        .subscribe((params: Params) => {
          let id = +params["id"];
          this.recipe = this.recipeService.getRecipe(id);
        });
  }

  onAddIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
