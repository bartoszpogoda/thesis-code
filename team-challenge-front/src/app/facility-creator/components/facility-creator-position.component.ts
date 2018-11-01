import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Region} from '../../core/models/region';

import {Position} from '../../core/models/position';
import {FacilityCreationForm} from '../../core/models/facility';

@Component({
  selector: 'app-facility-creator-position',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Określ położenie obiektu sportowego</h2>
    <p>Klikając wybrane miejsce w regionie {{region.name}}</p>
    <app-point-picker [icon]="basketIcon" [center]="region.center" 
                      [position]="builder?.position" acceptButtonText="Dalej" (accepted)="onAccepted($event)">
    </app-point-picker>
  `
})
export class FacilityCreatorPositionComponent {

  basketIcon = {
    url: '/assets/images/basket_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };

  @Input()
  region: Region;

  @Input()
  builder: FacilityCreationForm;

  @Output()
  accepted = new EventEmitter<Position>();

  onAccepted(position: Position) {
    this.accepted.emit(position);
  }

}

