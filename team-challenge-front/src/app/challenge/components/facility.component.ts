import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';


@Component({
  selector: 'app-facility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>{{facility.name}}</h3>
    <div style="line-height: 1.5;">
      <strong>Adres: </strong>{{facility.address}} <br />
      <strong>Oświetlenie: </strong>{{facility.lighting === true ? 'Tak' : 'Nie'}} <br />
      <strong>Nawierzchnia: </strong>{{facility.surfaceType}} <br />
      <strong>Miejsca do gry: </strong>{{facility.playingSpots}} <br />
      <strong>Koszt: </strong>{{facility.tokenPrice}} <i class="anticon anticon-pay-circle"></i><br />
    </div>
  `
})
export class FacilityComponent {

  @Input()
  facility: Facility;

}
