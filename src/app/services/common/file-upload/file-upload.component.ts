import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
  }
    this.dialogService.openDialog(({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallSpinFadeRotating);
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({"responseType": "blob"})
      }, fileData).subscribe(data => {

        const message: string = "File uploaded successfully";


        if (this.options.isAdminPage) {
          this.alertifyService.message(message, {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        } else {
          this.customToastrService.message(message, "successfull", {
            messageType: ToastrMessageType.Success,
          })
        }
        this.spinner.hide(SpinnerType.BallSpinFadeRotating);
      }, error => {
        const message: string = "File upload failed";

        if (this.options.isAdminPage) {
          this.alertifyService.message(message, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        } else {
          this.customToastrService.message(message, "failed", {
            messageType: ToastrMessageType.Error,
          })
        }
        this.spinner.hide(SpinnerType.BallSpinFadeRotating);
      });
    }}
    ));
  }
    // openDialog(afterClosed: any): void {
    //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    //     width: '250px',
    //     data: FileUploadDialogState.Yes,
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result == FileUploadDialogState.Yes)
    //       afterClosed();
    //   });
    //  }
  }


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}


