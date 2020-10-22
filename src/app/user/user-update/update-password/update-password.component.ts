import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) { }

  updateForm: FormGroup;
  updateUser: any = {};
  user: User;

  ngOnInit() {
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.userService.getUserById(this.authService.currentUserId).subscribe(data => {
      this.user = data;
      this.updateForm = this.formBuilder.group(
        {
          password: ["", Validators.required],
          newPassword: ["", [Validators.required, Validators.minLength(4)]],
          confirmPassword: ["", Validators.required]
        },
        { validator: this.passwordMatchValidator }
      )
    });
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value ===
      g.get('confirmPassword').value ? null : { mismatch: true }
  }

  update() {
    if (this.updateForm.valid) {
      this.updateUser = Object.assign({}, this.updateForm.value)
      this.authService.updatePassword(this.updateUser)
    }
  }

}
