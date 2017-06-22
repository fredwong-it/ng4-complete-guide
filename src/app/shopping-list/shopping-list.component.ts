import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { slService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private changedSubscription: Subscription;
  private exitEditModeSubscription: Subscription;
  selectedIndex: number;

  constructor(private slService: slService) { 
  }

  ngOnInit() {
    this.getIngredients();

    this.changedSubscription = this.slService.ingredientChanged
        .subscribe(() => {
          this.getIngredients();
        });

    this.exitEditModeSubscription = this.slService.exitEditMode
        .subscribe(() => {
          this.selectedIndex = null;
        });
  }

  getIngredients() {
    this.ingredients = this.slService.getIngredients();
  }

  onSelectItem(id: number) {
    this.selectedIndex = id;
    this.slService.selectIngredient(id);
  }

  ngOnDestroy() {
    this.changedSubscription.unsubscribe();
    this.exitEditModeSubscription.unsubscribe();
  }
}
