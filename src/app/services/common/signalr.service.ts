import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }

  //başlatılmış bir hub dönecek
  start(hubUrl: string) {
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

        hubConnection.start()
        .then(() => console.log("Connected"))
        .catch(error => setTimeout(() => this.start(hubUrl), 2000));

        this._connection = hubConnection;
  }
  this._connection.onreconnected(connectionId => console.log("Reconnected"));
  this._connection.onreconnecting(error => console.log("Reconnecting"));
  this._connection.onclose(error => console.log("Close reconnection"));

  }

  //signalr üzerinden herhangi bir clientın diğer clientlara bir mesaj göndermesini sağlayacak
  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.connection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  //serverdan gelecek olan anlık mesajları runtimeda yakalamamı sağlayacak temel alıcı fonksiyonları içerecek
  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
