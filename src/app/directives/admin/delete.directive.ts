import { AlertifyService, MessageType, Position } from './../../services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private el: ElementRef,
    private _renderer: Renderer2,
    private HttpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private AlertifyService: AlertifyService
  ) {
    const img = this._renderer.createElement('img');
    img.setAttribute("src", "../../../../../assets/delete_remove_icon.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(el.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallSpinFadeRotating);
      const td: HTMLTableCellElement = this.el.nativeElement;
      this.HttpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(() => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.callback.emit();
          this.AlertifyService.message("Deleted successfully", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        });
      }, (errorResponse: HttpErrorResponse) =>{
        this.spinner.hide(SpinnerType.BallSpinFadeRotating)
        this.AlertifyService.message("An error was encountered while deleting the product", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      });
      });
    }

  openDialog(afterClosed: any): void {
   const dialogRef = this.dialog.open(DeleteDialogComponent, {
     width: '250px',
     data: DeleteState.Yes,
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result == DeleteState.Yes)
       afterClosed();
   });
  }

}
