import { Component, inject } from '@angular/core';
import { Header } from '../../widgets/header/header';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-payment',
  imports: [Header],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order {
  private readonly route = inject(ActivatedRoute);

  protected readonly paymentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('paymentId'))),
  );
}
