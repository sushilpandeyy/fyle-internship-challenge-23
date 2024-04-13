import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = {};
  repodata: any = [];
  loading: boolean = true;
  repoloading: boolean = true;
  error: string | null = null;
  searchInput: string = '';


  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    
  }
  loadrepo(): void {
    this.apiService.getReposForUser(this.searchInput).then(
      (response: any) => {
        this.repodata = response;
        this.repoloading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again later.';
        this.loading = false;
      }
    );
  }

  loadData(): void {
    this.apiService.getUser(this.searchInput).then(
      (response: any) => {
        this.data = response;
        console.log(this.data);
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again later.';
        this.loading = false;
      }
    );
  }

  handleSearch(): void {
    this.loadData();
    this.loadrepo();
  }

  //PAGINATION

  itemsPerPageOptions: number[] = [2, 4, 6, 8];
  itemsPerPage: number = 2; 
  currentPage: number = 1; 
  totalPages: number = 1; 
  paginatedData: any[] = []; 

  paginateData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  changeItemsPerPage(event: any) {
    const value = event?.target?.value;
    if (value !== undefined) {
        this.itemsPerPage = parseInt(value, 10); 
        this.currentPage = 1;
        this.paginateData();
    }
}
}
