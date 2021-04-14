import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
  }

  registerIcons() {
    this.matIconRegistry.addSvgIcon(
      'filters',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/filters.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/back_arrow.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/trash.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'map-expand',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/map_expand.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'map-shrink',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/map_shrink.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/check.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'messages-check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/graphics/icons/messages-check.svg')
    );
  }

}
