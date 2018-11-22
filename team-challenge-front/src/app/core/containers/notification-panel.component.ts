import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import * as AuthActions from '../../auth/actions/auth.actions';


@Component({
  selector: 'app-notification-panel',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-drawer [nzClosable]="false" [nzVisible]="isVisible" nzPlacement="right" nzTitle="Notifications">
      <!-- TODO to be extracted to dumb component, make discardable?-->
      <div class="notifications-container">
        <!--<nz-card>-->
          <!--<p>Your team "DreamTeam" was challenged!</p>-->
          <!--<button nz-button nzType="primary">Details</button>-->
        <!--</nz-card>-->
        <!--<nz-card>-->
          <!--<p>You've been invited to the team "DreamTeam"</p>-->
          <!--<button nz-button nzType="primary">Details</button>-->
        <!--</nz-card>-->
        <!--<nz-card>-->
          <!--<p>You've been invited to the team "DreamTeam"</p>-->
          <!--<button nz-button nzType="primary">Details</button>-->
        <!--</nz-card>-->
        <!--<nz-card>-->
          <!--<p>You've been invited to the team "DreamTeam"</p>-->
          <!--<button nz-button nzType="primary">Details</button>-->
        <!--</nz-card>-->
        <p>Panel powiadomień</p>
        <app-prototype-notification [inline]="true" [unavailable]="true"></app-prototype-notification>
      </div>
      <div class="profile-actions-container">
        <button nz-button nzType="primary" class="logout-button" (click)="logout()"><i class="anticon anticon-poweroff">
        </i>Wyloguj się</button>
      </div>
    </nz-drawer>
  `, styles: [`
    nz-drawer {
      display: flex;
    }
    nz-card {
      margin-bottom: 5px;
    }
    .logout-button {
      width: 100%;
      background-color: #ea2626;
      border-color: #ea2626;
    }
  `]
})
export class NotificationPanelComponent {
  @Input() isVisible = false;

  constructor(private store: Store<fromAuth.State>) {}

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

