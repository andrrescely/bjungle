import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryComponent } from '../library/library/library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba_tecnica_bjungle';
}
