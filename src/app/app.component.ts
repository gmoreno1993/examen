import { Component } from '@angular/core';
import { CatalogService }  from './catalog.service';
import { Catalog } from './catalog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  catalogForm: FormGroup;
  public catalogs: Catalog[];
  title = 'examen';
  pageActual: number = 1;
  constructor(private catalogService: CatalogService, public fb: FormBuilder) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.getAll();
  }

  mainForm() {
    this.catalogForm = this.fb.group({
      url: ['', ],
      format: ['', ],
      title: ['', ],
      type: ['', ],
      about: ['', ],
    });
  }

  get myForm() {
    return this.catalogForm.controls;
  }

  getAll() {
    return this.catalogService.getData().subscribe((res: any) => {
      this.catalogs = res.result.items as Catalog[];
    });
  }

  add() {
    var table = `
                  <tr>
                    <td>${this.catalogForm.value.url}</td>
                    <td>${this.catalogForm.value.format}</td>
                    <td>${this.catalogForm.value.title}</td>
                    <td>${this.catalogForm.value.type}</td>
                    <td>${this.catalogForm.value.about}</td>
                    <td>
                      <button (click)="edit(i)">editar</button>
                      <button (click)="delete(i)">eliminar</button>
                    </td>
                  </tr>
                `;
    document.getElementById("catalog").append(table);
  }

  edit(cat) {
    console.log(cat)
  }

  delete(index) {
    this.catalogs.splice(index, 1);
  }

}
