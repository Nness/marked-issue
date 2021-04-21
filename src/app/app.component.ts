import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly title = 'marked-issue';
  readonly test: string = `   ### Title

<h3>Header 3</h3>
  
<p style="font-size:14px;">First HTML sentence</p>
  
<p style="font-size:14px;">Second HTML sentence</p>
  
<p style="font-size:14px;">Third HTML sentence</p>  
  
    
  
### Full Name
  
Test name
  
    
### ABC title with space at end of line  
Another line`;
}
