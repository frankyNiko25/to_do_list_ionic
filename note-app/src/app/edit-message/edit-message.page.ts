import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.page.html',
  styleUrls: ['./edit-message.page.scss'],
})
export class EditMessagePage implements OnInit {
  title: string;
  text: string;
  id: string;


  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onSubmit() {
    this.api.updateNote(this.title, this.text, this.id).subscribe((res) => {
      console.log(res);
      alert('Nota aggiornata!');
      this.router.navigate(['/']);
    });
  }
}
