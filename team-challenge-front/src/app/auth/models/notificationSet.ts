
// TODO add enum for notification types?
export class NotificationSet {

  constructor(private contents: string[]) {}

  add(notification: string): NotificationSet {
    const cloned = this.contents.map(x => Object.assign({}, x));

    if (!cloned.includes(notification)) {
      cloned.push(notification);
    }

    return new NotificationSet(cloned);
  }

  remove(notification: string): NotificationSet {
    const cloned = this.contents.map(x => Object.assign({}, x));

    const indexOf = cloned.indexOf(notification);
    if (indexOf > 0) {
      cloned.splice(indexOf, 1);
    }

    return new NotificationSet(cloned);
  }

  any(): boolean {
    return this.contents.length > 0;
  }

  toString(): string {
    return 'Test';
  }

}
