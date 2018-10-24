import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-image-loader',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-upload class="avatar-uploader"
               [nzAction]="uploadUrl"
               nzName="file"
               nzListType="picture-card"
               [nzShowUploadList]="false"
               [nzBeforeUpload]="beforeUpload"
               (nzChange)="handleChange($event)">
      <ng-container *ngIf="!avatarUrl">
        <i nz-icon type="plus"></i>
        <div class="ant-upload-text">Wybierz...</div>
      </ng-container>
      <img *ngIf="avatarUrl" [src]="avatarUrl" class="avatar">
    </nz-upload>
  `,
  styles: [
  `
    :host ::ng-deep .avatar-uploader > .ant-upload {
      width: 256px;
      height: 256px;
      margin: auto;
    }

    :host ::ng-deep img {
      width: 256px;
      height: 256px;
    }

    :host ::ng-deep .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }
    :host ::ng-deep .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }

  `]
})
export class ImageLoaderComponent {

  avatarUrl: string;

  @Input()
  uploadUrl: string;

  @Output()
  startedUpload = new EventEmitter();

  @Output()
  uploaded = new EventEmitter<string>();

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.msg.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange(info: { file: UploadFile }): void {
    if (info.file.status === 'uploading') {
      this.startedUpload.emit();
      return;
    }
    if (info.file.status === 'done') {
      const savedImagePath = info.file.response.path;

      this.uploaded.emit(savedImagePath);
      this.avatarUrl = this.uploadUrl + '/' + savedImagePath + '?' + new Date();
    }
  }
}

