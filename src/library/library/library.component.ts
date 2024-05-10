import {  Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgFor, FormsModule, MatToolbarModule, MatInputModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {


  booksNumber: any;
  books: any = { docs: [] }; 
  booksFilter: any[] = [];
  numberBooks: number = 0;
  filter: string = "";
  imageNumber = 29332;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe(res => {
      this.books = res;
      this.booksFilter = this.books.docs;
    })
  }

  getBooksNumber() {
    this.filter = "";
    this.apiService.getBooksNumber(this.numberBooks).subscribe(res => {
      this.booksNumber = res;
    })
  }

  filterBooks(): void {
    if (!this.filter) {
      this.booksFilter = this.books.docs;
    } else {
      this.numberBooks = 0
      this.booksFilter = this.books.docs.filter((bookRes: { name?: string; url?: string; full_url?: string; seed_count?: string; last_update?: string }) => {
        return (bookRes.name && bookRes.name.toLowerCase().includes(this.filter.toLowerCase())) ||
          (bookRes.url && bookRes.url.toLowerCase().includes(this.filter.toLowerCase())) ||
          (bookRes.full_url && bookRes.full_url.toLowerCase().includes(this.filter.toLowerCase())) ||
          (bookRes.seed_count && bookRes.seed_count.toString().includes(this.filter)) ||
          (bookRes.last_update && bookRes.last_update.toString().includes(this.filter));
      });
    }
  }
  viewAll() {
    this.numberBooks = 0
    this.filter = "";
  }


  getImageUrl(numberPage: number) {
    const baseUrl = 'https://covers.openlibrary.org/b/id/';
    const imageExtension = '.jpg';
    return baseUrl + this.imageNumber + numberPage + '-M' + imageExtension;

  }
}
