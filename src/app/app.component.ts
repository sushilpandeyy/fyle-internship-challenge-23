import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput: string = '';

  handleInputChange() {
    console.log(this.searchInput);
  }

  handleSearch() {
    console.log('Search button clicked!');
  }
}
