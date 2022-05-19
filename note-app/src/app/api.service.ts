import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'http://localhost:3001/api/notes/';
  constructor(private http: HttpClient) {}

  getNotes = () => this.http.get(this.API_URL);

  getDeletedNotes = () => this.http.get(this.API_URL + '?deleted=1');
  getArchivedNotes = () => this.http.get(this.API_URL + '?archived=1');

  trashNote = (id: string) => this.http.delete(this.API_URL + 'trash/' + id);

  archiveNote = (id: string) => this.http.delete(this.API_URL + 'archive/' + id);

  deleteNote = (id: string) => this.http.delete(this.API_URL + id);

  restoreNote = (id: string) => this.http.get(this.API_URL + 'restore/' + id);

  dearchiveNote = (id: string) => this.http.get(this.API_URL + 'dearchive/' + id);

  
   updateNote = (title: string, text: string, id: string) =>
    this.http.post(this.API_URL + 'update/' + id, {
      title,
      text,
    });

  setNote = (title: string, text: string) =>
    this.http.post(this.API_URL, {
      title,
      text,
    });
}
