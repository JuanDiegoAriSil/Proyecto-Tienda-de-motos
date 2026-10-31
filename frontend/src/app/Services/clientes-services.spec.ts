import { TestBed } from '@angular/core/testing';
import { ClientsServices } from './clientes-services';

describe('ClientesServices', () => {
  let service: ClientsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
