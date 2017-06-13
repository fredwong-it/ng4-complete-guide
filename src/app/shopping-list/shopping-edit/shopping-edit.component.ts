import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  //@Output() addedIngredient = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(nameInput: HTMLInputElement) {
    const name = nameInput.value;
    const amount = this.amountInput.nativeElement.value;
    const ingredient = new Ingredient(name, amount);

    //this.addedIngredient.emit(ingredient);
    this.shoppingListService.addIngredient(ingredient);
  }
}
