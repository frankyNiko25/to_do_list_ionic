import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  isLogin: boolean = false;

  notes: any;

  public folder: string = 'Note';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    /* if (!this.isLogin){
      this.router.navigate(["/login"])
    } */

    this.folder = this.activatedRoute.snapshot.paramMap.get('page');
    if (!this.folder) {
      this.folder = 'Note';
    }
    console.log(this.folder);
    switch (this.folder) {
      case 'eliminati':
        this.getAllNotes(true);
        break;
      case 'archiviati':
        this.getAllNotes(false, true);
        break;
      case 'refresh':
        this.getAllNotes(false, false);
        break;
      default:
        this.getAllNotes();
        break;
    }
  }



  getAllNotes(isEliminated: boolean = false, isArchived: boolean = false) {
    if (isEliminated) {
      this.api.getDeletedNotes().subscribe((res) => {
        console.log(res);
        this.notes = res;
      });
      return;
    }

    if (isArchived) {
      this.api.getArchivedNotes().subscribe((res) => {
        console.log(res);
        this.notes = res;
      });
      return;
    }

    this.api.getNotes().subscribe((res) => {
      console.log(res);
      this.notes = res;
    });
  }

  trash(id: string) {
    console.log('cestino la ' + id);
    this.api.trashNote(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
      this.router.navigate([this.router.url]);
    });
  }

  delete(id: string) {
    console.log('elimino la ' + id);
    this.api.deleteNote(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
      this.router.navigate([this.router.url]);
    });
  }

  archive(id: string) {
    console.log('archivio la ' + id);
    this.api.archiveNote(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
      this.router.navigate([this.router.url]);
    });
  }

  restore(id: string) {
    console.log('recupero la ' + id);
    this.api.restoreNote(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
      this.router.navigate([this.router.url]);
    });
  }

  dearchive(id: string) {
    console.log('recupero la ' + id);
    this.api.dearchiveNote(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
      this.router.navigate([this.router.url]);
    });
  }

  update(id:string) {
    this.router.navigate(['/edit-message/'+id]);
  }


}
