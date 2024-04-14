import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
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
  wholeloading: boolean = true;
  user404: boolean = false;
  searched: boolean = true;

  constructor(private renderer: Renderer2, private apiService: ApiService) {}
  ngOnInit(): void {
    
  }
  loadrepo(): void {
    this.apiService.getReposForUser(this.searchInput, this.currentPage, this.perpage).subscribe({
      next: (response: any) => {
        this.repodata = response;
        console.log(this.repodata)
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
    this.searched=false;
    this.apiService.getUser(this.searchInput).subscribe({
        next: (response: any) => {
            this.data = response;
            this.nrepo = this.data.public_repos;
            this.totalPages = Math.ceil(this.nrepo / this.perpage);
            this.loading = false;
            this.user404 = false;
            
        },
        error: (error: any) => {
            console.error('Error fetching data:', error);
            if (error.status === 404) {
                this.user404 = true; 
            }
            this.error = 'Error fetching data. Please try again later.';
            this.loading = false;
        }
    });
}
  handleSearch(): void {
    if (this.searchInput) {
      this.loadData();
      this.loadrepo();
      this.generatePagesArray(this.totalPages);
      this.wholeloading = false;
      
    }
    else{
      this.resetState();
      this.searched=true;
    } 
  }

  resetState(): void {
    this.data = {};
    this.perpage = 10;
    this.nrepo = 0;
    this.repodata = [];
    this.loading = true;
    this.repoloading = true;
    this.error = null;
    this.searchInput = '';
    this.wholeloading = true;
    this.user404 = false;
    this.searched = true;
    this.currentPage = 1;
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
    return pagesArray;
  }
  prevPage(): void {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
      this.loadrepo();
    }
  }
  nextPage(): void {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.emitPageChange();
      this.loadrepo();
    }
  }
  goToPage(page: number): void {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.perpage <= 0) {
        console.warn('Invalid perpage value:', this.perpage);
        return;
    }
    this.totalPages = Math.ceil(this.nrepo / this.perpage);
    if (this.totalPages < 1) {
        this.totalPages = 1;
    }
}
  onChange(value: number) {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.perpage = value;
    this.updateTotalPages();
    this.loadrepo();
}

}
  

