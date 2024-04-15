import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should call loadData and loadrepo when handleSearch is invoked', () => {
    spyOn(component, 'loadData');
    spyOn(component, 'loadrepo');
    
    component.searchInput = 'testuser';
    component.handleSearch();
    
    expect(component.loadData).toHaveBeenCalled();
    expect(component.loadrepo).toHaveBeenCalled();
  });

  it('should reset state when searchInput is empty', () => {
    spyOn(component, 'resetState');
    
    component.searchInput = '';
    component.handleSearch();
    
    expect(component.resetState).toHaveBeenCalled();
  });

  it('should set repodata correctly when loadrepo is called', () => {
    const mockResponse = [
      { repo: 'testrepo1' },
      { repo: 'testrepo2' }
    ];
    
    spyOn(apiService, 'getReposForUser').and.returnValue(of(mockResponse));
    
    component.loadrepo();
    
    expect(component.repodata).toEqual(mockResponse);
    expect(component.repoloading).toBe(false);
  });

  it('should handle errors during loadrepo', () => {
    const errorResponse = new ErrorEvent('API error');
    
    spyOn(apiService, 'getReposForUser').and.returnValue(throwError(errorResponse));
    
    component.loadrepo();
    
    expect(component.error).toBe('Error fetching data. Please try again later.');
    expect(component.repoloading).toBe(false);
  });

  it('should set data and handle user404 correctly during loadData', () => {
    const mockResponse = {
      public_repos: 10
    };
    
    spyOn(apiService, 'getUser').and.returnValue(of(mockResponse));
    
    component.loadData();
    
    expect(component.data).toEqual(mockResponse);
    expect(component.nrepo).toBe(10);
    expect(component.loading).toBe(false);
    expect(component.user404).toBe(false);
  });

  it('should handle 404 error correctly during loadData', () => {
    const errorResponse = { status: 404 };
    
    spyOn(apiService, 'getUser').and.returnValue(throwError(errorResponse));
    
    component.loadData();
    
    expect(component.user404).toBe(true);
    expect(component.error).toBe('Error fetching data. Please try again later.');
    expect(component.loading).toBe(false);
  });

  it('should update totalPages when perpage changes', () => {
    component.nrepo = 25; 
    component.perpage = 10;
    
    component.updateTotalPages();
    
    expect(component.totalPages).toBe(3);
  });



  it('should handle navigation correctly (previous, next, goToPage)', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
    component.currentPage = 1;
    component.totalPages = 2;
    component.nextPage();
    expect(component.currentPage).toBe(2);
    component.currentPage = 1;
    component.goToPage(3);
    expect(component.currentPage).toBe(3);
  });
});
