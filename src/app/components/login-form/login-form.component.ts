import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  /** Form group name */
  public loginForm: FormGroup = new FormGroup({});
  public passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  public passwordErrMsg: string = '';
  public formErrorFlag: boolean = false;
  public passErrorFlag: boolean = false;
  /**To determnine form submission status */
  public formSubmit: boolean = false;
  public isValid:boolean | undefined=false;

  /**
   * Constructor
   * @param formBuilder 
   * @param router 
   */
  public constructor(public formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern), Validators.minLength(8)]]
    })
  }

  /**
   * Runs on component initialisation
   */
  public ngOnInit(){
    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordValidity();
    });
  }

  /**
   * Triggers on clicking login button to validate form
   */
  public onSubmit() {
    this.formSubmit = true;
    const passwordControl = this.loginForm.get('password');
    if (!this.loginForm.valid) {
      this.formErrorFlag = true;
      if (passwordControl?.hasError('pattern')) {
        this.passErrorFlag = true;
        this.passwordErrMsg = 'Please enter at least 8 characters with a number, symbol, capital and lowercase letter';
      } else {
        this.passErrorFlag = false;
      }
    } else {

      this.router.navigate(['students-data'])
    }
  }
  /**  Function to check if the password field meets the pattern and update styles accordingly */
  public checkPasswordValidity() {
    const passwordControl = this.loginForm.get('password');
    this.isValid = passwordControl?.valid  && passwordControl?.dirty;
    console.log(this.isValid,'valid')
    return this.isValid;
  }

}
