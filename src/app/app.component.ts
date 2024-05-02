import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Departament} from "./departament";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamenUF2AAD';

  constructor(private http: HttpClient) {

    this.http.post<any>('http://localhost:3080/modifCorreuRaulLuna', {}).subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
      }
    );

    const dept = new Departament(10, "DeptRaul", "Brasil", "691073749", "42327577X")

    /*this.http.post<any>('http://localhost:3080/modifDeptRaulLuna', dept).subscribe((response) => {
      console.log(response)
    }, error => {
      console.log("no puc pelacanyes!!")
    })*/

    this.http.get('http://localhost:3080/llistaAssigRaulLuna').subscribe((data) => {
      console.log(data)
    })

    this.http.get('http://localhost:3080/impartirAssigRaulLuna').subscribe((data) => {
      console.log(data)
    })

  }

}
