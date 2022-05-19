import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.page.html',
  styleUrls: ['./create-message.page.scss'],
})
export class CreateMessagePage implements OnInit {
  title: string;
  text: string;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.api.setNote(this.title, this.text).subscribe((res) => {
      console.log(res);
      alert('Nota aggiunta!');
      this.router.navigate(['/note/refresh']);
    });
  }
}
