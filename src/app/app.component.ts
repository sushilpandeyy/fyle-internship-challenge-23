import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = {};
  perpage: number = 10;
  nrepo: number = 0;
  repodata: any = [];
  loading: boolean = true;
  repoloading: boolean = true;
  error: string | null = null;
  searchInput: string = '';


  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    
  }
  loadrepo(): void {
    this.apiService.getReposForUser(this.searchInput, this.currentPage, this.perpage).subscribe({
      next: (response: any) => {
        this.repodata = response;
        this.repoloading = false;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  

  loadData(): void {
    this.apiService.getUser(this.searchInput).subscribe({
      next: (response: any) => {
        this.data = response;
        this.nrepo = this.data.public_repos;
        this.totalPages = Math.ceil(this.nrepo / this.perpage);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again later.';
        this.loading = false;
      }
    });
  }
  

  handleSearch(): void {
    this.loadData();
    this.loadrepo();
    this.generatePagesArray(this.totalPages);
  }

  //PAGINATION
  totalPages = 10;
  currentPage = 1;

  @Output() pageChanged = new EventEmitter<number>();

  generatePagesArray(totalPages: number): number[] {
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    console.log('pagesArray:', pagesArray);
    return pagesArray;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
      this.loadrepo();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
      this.loadrepo();
    }
  }

  goToPage(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.emitPageChange();
      this.loadrepo();
    }
  }

  private emitPageChange(): void {
    this.pageChanged.emit(this.currentPage);
  }
  updateTotalPages(): void {
    if (this.perpage <= 0) {
        console.warn('Invalid perpage value:', this.perpage);
        return;
    }

    this.totalPages = Math.ceil(this.nrepo / this.perpage);
    if (this.totalPages < 1) {
        this.totalPages = 1;
    }
    console.log('Updated totalPages:', this.totalPages);
}
  onChange(value: number) {
    this.perpage = value;
    this.updateTotalPages();
    this.loadrepo();
}

}
  

