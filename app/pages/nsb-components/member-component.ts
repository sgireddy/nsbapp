import { Component, Input } from '@angular/core';
import {Member} from '../../providers/interfaces';

@Component({
  selector: 'nsb-member',
  templateUrl: 'build/pages/nsb-components/member-component.html'
})

export class MemberComponent {
  @Input()
  member: Member;
}