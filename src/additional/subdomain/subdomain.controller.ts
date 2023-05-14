import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.localhost', path: 'subdomain' })
export class SubdomainController {
  @Get()
  getInfo(@HostParam('account') account: string): string {
    console.log('account :>> ', account);
    return account;
  }
}
