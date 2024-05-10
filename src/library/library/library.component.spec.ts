import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let apiServiceStub: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceStub = jasmine.createSpyObj('ApiService', [
      'getBooks',
      'getBooksNumber',
    ]);
    await TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter books by name', () => {
    // Arrange (organizar)
    const books = {
      docs: [
        {
          name: 'Book 1',
          url: 'url1',
          full_url: 'full_url1',
          seed_count: '1',
          last_update: '2024-05-01',
        },
        {
          name: 'Book 2',
          url: 'url2',
          full_url: 'full_url2',
          seed_count: '2',
          last_update: '2024-05-02',
        },
      ],
    };
    apiServiceStub.getBooks.and.returnValue(of(books));

    // Act (actuar)
    component.filter = 'Book 1';
    component.filterBooks();

    // Assert (afirmar)
    expect(component.booksFilter.length).toBe(1);
    expect(component.booksFilter[0].name).toBe('Book 1');
  });

  it('should filter books by quantity', () => {
    // Arrange (organizar)
    const books = {
      docs: [
        {
          name: 'Book 1',
          url: 'url1',
          full_url: 'full_url1',
          seed_count: '1',
          last_update: '2024-05-01',
        },
        {
          name: 'Book 2',
          url: 'url2',
          full_url: 'full_url2',
          seed_count: '2',
          last_update: '2024-05-02',
        },
      ],
    };
    apiServiceStub.getBooks.and.returnValue(of(books));

    // Act (actuar)
    component.numberBooks = 1;
    component.getBooksNumber();
    fixture.detectChanges();

    // Assert (afirmar)
    expect(component.booksFilter.length).toBe(1);
  });
});
