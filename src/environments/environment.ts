// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  logger: {
    level: 'TRACE',
  },
  recaptcha: {
    siteKey: '6Lfq-LEgAAAAAJ5sjnF4nAFMIXwDDPaFpMOOopKp',
  },
  googleMap:{
    siteKey:'https://maps.googleapis.com/maps/api/js?key=AIzaSyB_MSJW9olNYJTx2aV__gypRbbknDGLoiU&v=weekly'
  },
  BASE_PATH:'http://65.1.142.235:1337/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
