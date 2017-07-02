import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        return this.http.put("https://ng-recipe-book-8ba77.firebaseio.com/recipes.json", recipes);
    }

    getRecipes() {
        this.http.get("https://ng-recipe-book-8ba77.firebaseio.com/recipes.json")
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();

                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }

                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                    console.log(recipes);
                }
            );
    }
}