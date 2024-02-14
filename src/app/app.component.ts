import {Component} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-task'

  public isWaiting = true;
  public isSuccess = false;
  public name = '';

  submit(event: any): void {
    this.name = event.currentTarget.value;
    this.isWaiting = false;

    this.simulateServer()
      .then(() => {
          event.currentTarget.focus();
        this.isSuccess = true;
      })
      .catch(() => {
          event.currentTarget.focus();
        this.isSuccess = false;
      })
      .finally(() => {
        const t= setTimeout(() => {
          this.isSuccess = false;
          this.isWaiting = true;
          clearTimeout(t);
        }, 1000)
      })

    event.currentTarget.value = '';
  }

  simulateServer() {
    return new Promise<void>((resolve, reject) => {
      if (Math.random() > 0.5) {
        return resolve();
      }
      const t: any = setTimeout(() => {
        reject();
        return clearTimeout(t);
      }, 2000);
    });
  };
}
