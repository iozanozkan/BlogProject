import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload-user-photo',
  templateUrl: './upload-user-photo.component.html',
  styleUrls: ['./upload-user-photo.component.css']
})
export class UploadUserPhotoComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();
  @Input() photoUrl: any;
  previewUrl: any = null;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  uploadFile(files){
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.uploadService.uploadFile(formData).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.onUploadFinished.emit(event.body);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
          this.previewUrl = event.target.result;
        }
      }
    });
  }

}
