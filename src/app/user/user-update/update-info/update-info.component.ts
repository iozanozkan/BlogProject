import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) { }

  updateForm: FormGroup;
  updateUser: any = {};
  user: User;
  response: { dbPath } = null;

  ngOnInit() {
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.userService.getUserById(this.authService.currentUserId).subscribe(data => {
      this.user = data;
      this.updateForm = this.formBuilder.group(
        {
          name: [this.user.name, Validators.required],
          surname: [this.user.surname, Validators.required],
          email: [this.user.email, Validators.required],
          username: [this.user.username, Validators.required],
        }
      )
    });
  }

  update() {
    if (this.updateForm.valid) {
      this.updateUser = Object.assign({}, this.updateForm.value)
      this.updateUser.photoUrl = this.response != null ? this.response.dbPath : this.user.photoUrl
      this.authService.update(this.updateUser)
    }
  }

  uploadFinished = (event) => {
    this.response = event;
  }
}


