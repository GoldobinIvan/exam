import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Muser } from 'src/app/shared/components/header/models/muser.model';
import { MuserService } from 'src/app/shared/services/muser.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id!: number;
  user!: Muser;
  userForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private muserService: MuserService,
    private router: Router
    ) {
    this.activatedRoute.params.subscribe(params => {
      if(params.id != null) {
        this.id = +params.id;
      } else {
        
      }
    })
   }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
    });
    this.getData();
  }

  async getData() {
    if(this.id != null) {
      try {
        let user = this.muserService.getOneById(this.id);
        this.user = await user;
      } catch(err) {
        console.error(err);
      }
      this.userForm.patchValue({
        name: this.user.name,
        surname: this.user.surname,
      })
    }
  }

  async onDelete() {
    try {
      await this.muserService.deleteOnById(this.id);
    } catch(err) {
      console.error(err);
    }
    this.router.navigate(['/users']);
  }

  async onSave() {
    if((this.id != null) || (this.id != undefined)) {
      try{
        await this.muserService.putOne(this.id, this.userForm.value);
      } catch(err) {
        console.error(err);
      }
    } else {
      try{
        let res = await this.muserService.postOne(this.userForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch(err) {
        console.error(err);
      }
    }
  }
}
