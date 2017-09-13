import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent{

    foto: FotoComponent = new FotoComponent();
    service: FotoService;
    meuForm: FormGroup;
    route: ActivatedRoute;
    router: Router;
    mensagem: string = '';

    constructor(service : FotoService, fb : FormBuilder, route: ActivatedRoute, router: Router){
        this.service = service;
        this.route = route;
        this.router = router;

        this.route.params.subscribe(params => {

            let id = params['id'];

            if(id) {

                this.service.buscaPorId(id)
                    .subscribe(
                        foto => this.foto = foto,
                        erro => console.log(erro));    
            }            
         });

        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
            url: ['', Validators.required],
            descricao: [''],
        });
    }

    cadastrar(event) {
        event.preventDefault();
        console.log(this.foto);
        this.service.cadastra(this.foto)
            .subscribe(res => {
                this.foto = new FotoComponent();
                this.mensagem = res.mensagem;
                if (!res.inclusao) this.router.navigate(['']);
            }, erro =>  console.log(erro));
    }

    buscaPorId(id: string){
        return this.service.buscaPorId(id);
    }
}