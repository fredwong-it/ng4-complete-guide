import { AuthService } from '../../auth/auth.service';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id: number;

  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.id = +params["id"];
          this.recipe = this.recipeService.getRecipe(this.id);
        });
  }

  onAddIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    // redirect to signin page if it is not authenticated
    if (this.authService.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(["/recipes"]);
    }
    else {
      this.router.navigate(['/signin']);
    }
  }
}
