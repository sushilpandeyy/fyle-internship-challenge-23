import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = {};
  repodata: any = {};
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
        console.log(this.repodata);
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
}
