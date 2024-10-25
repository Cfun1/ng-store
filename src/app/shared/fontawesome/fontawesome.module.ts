import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

/*Import all icons rather than, importing each sing one in component and assign to field, caveat may increase bundle size*/
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Import all regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Import all brand icons

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class FontawesomeModule {
  constructor(library: FaIconLibrary) {
    // Add all icons to the library for global use
    library.addIconPacks(fas, far, fab);
    //usage:  <fa-icon [icon]="['fas', 'envelope']"></fa-icon>
  }
}
