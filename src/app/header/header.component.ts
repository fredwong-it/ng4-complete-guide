import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    @Output() navFired = new EventEmitter<string>();

    onRecipe() {
        this.navFired.emit("recipe");
    }

    onShoppingList() {
        this.navFired.emit("shoppingList");
    }
}