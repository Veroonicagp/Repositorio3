// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupsRepositoryFactory, PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { PeopleService } from './core/services/impl/people.service';
import { GROUPS_API_URL_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
import { PeopleLocalStorageMapping } from './core/repositories/impl/people-mapping-local-storage.service';
import { PeopleMappingJsonServer } from './core/repositories/impl/people-mapping-json-server.service';
import { GroupsMappingJsonServer } from './core/repositories/impl/groups-mapping-json-server.service';
import { GroupsService } from './core/services/impl/groups.service';
import { PersonModalComponent } from './components/person-modal/person-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupSelectableComponent } from './components/group-selectable/group-selectable.component';
import { PeopleMappingStrapi } from './core/repositories/impl/people-mapping-strapi.service';
import { GroupsMappingStrapi } from './core/repositories/impl/groups-mapping-strapi.service';
@NgModule({
  declarations: [AppComponent, PersonModalComponent, GroupSelectableComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    
    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'people' },
    { provide: GROUPS_RESOURCE_NAME_TOKEN, useValue: 'groups' },
    { provide: PEOPLE_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: GROUPS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    // Registrar los repositorios
    { 
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN, 
      useClass: PeopleMappingStrapi
    },
    { 
      provide: GROUPS_REPOSITORY_MAPPING_TOKEN, 
      useClass: GroupsMappingStrapi
    },
    PeopleRepositoryFactory,
    GroupsRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    },
    {
      provide: 'GroupsService',
      useClass: GroupsService
    }
    // ... otros proveedores],

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}