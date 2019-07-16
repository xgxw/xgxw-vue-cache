import VueRouter, { Route } from 'vue-router';
import { client as tokenClient } from '@/api/token'
import { getLoginPath } from '@/router';

export function getFidFromPath(route: Route): string {
  return route.params.pathMatch;
}

export function redirectToLogin(router: VueRouter): Promise<any> {
  return new Promise<any>((resolved, reject) => {
    tokenClient.hasTokenInfo().then(res => {
      resolved()
    }).catch(e => {
      router.push(getLoginPath())
      reject()
    })
  })
}