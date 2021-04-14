import {Injectable} from '@angular/core';
import {OverlayLoadingConfig} from './overlay-config';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerComponent} from './spinner/spinner.component';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {OverlayRef} from '@angular/cdk/overlay/overlay-ref';


const DEFAULT_CONFIG: OverlayLoadingConfig = {
  hasBackdrop: true,
};

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  overlayRef: OverlayRef;
  constructor(
    private overlay: Overlay) { }

  open() {
    this.overlayRef = this.createOverlay(DEFAULT_CONFIG);
    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(SpinnerComponent);
    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(filePreviewPortal);
  }

  close(): void {
    this.overlayRef.dispose();
  }

  private createOverlay(config: OverlayLoadingConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: OverlayLoadingConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
