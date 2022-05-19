import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Note', url: '/note', icon: 'mail' },
    { title: 'Archivia', url: '/note/archiviati', icon: 'archive' },
    { title: 'Eliminati', url: '/note/eliminati', icon: 'trash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
