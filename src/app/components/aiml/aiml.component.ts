import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Aiml } from 'app/models/aiml';
import { Aiml_if } from 'app/models/aiml_if';

@Component({
  selector: 'app-aiml',
  templateUrl: './aiml.component.html',
  styleUrls: ['./aiml.component.css']
})
export class AimlComponent implements OnInit {
  aiml: Aiml[] = [];
  aimlIf: Aiml_if[] = [];

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.authService.countAiml().subscribe(
      data => {
        this.aiml = data;
      },
      err => {
        console.log(err);
      }
    );

    this.authService.countAimlIf().subscribe(
      data => {
        this.aimlIf = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
