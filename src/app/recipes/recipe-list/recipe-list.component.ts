import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Test recipe 1", "This is a test recipe 1", "http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg"),
    new Recipe("Apple recipe", "This is a apple recipe", "http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg")
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelect(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
