import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState,
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}


export enum DeleteState {
  Yes,
  No
}

// export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {
//   constructor(
//     dialogRef: MatDialogRef<DeleteDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DeleteState,
//   ) {
//     super(dialogRef);
//   }
// }

// export enum DeleteState {
//   Yes,
//   No
// }
