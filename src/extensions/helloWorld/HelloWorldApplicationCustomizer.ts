import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  

  @override
   public onInit(): Promise<void> {
     Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

     // Added to handle possible changes on the existence of placeholders.
       this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
      this._renderPlaceHolders();
      return Promise.resolve<void>();
    
  }


  // RENDER PLACEHOLDERS TOP AND BOTTOM


  private _renderPlaceHolders(): void {

    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
  this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    // Handling the top placeholder
    if (!this._topPlaceholder) {
  this._topPlaceholder =
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose });

  // The extension should not assume that the expected placeholder is available.
  if (!this._topPlaceholder) {
    console.error('The expected placeholder (Top) was not found.');
    return;
  }

  if (this.properties) {
    let topString: string = this.properties.Top;
    if (!topString) {
      topString = '(Top property was not defined.)';
    }

    if (this._topPlaceholder.domElement) {
      this._topPlaceholder.domElement.innerHTML = `
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        <div class="${styles.app}">
          <div class="${styles.top}">
            <div class="${styles.low}">
              <a class="${styles.link2}", href="#">INTRANET</a>
              <a class="${styles.link}", href="#">WORKSPACES</a>
              <a class="${styles.link}", href="#">CUSTOMERS</a>
              <a class="${styles.link3}", href="#">EXTRANET</a>
            </div>
            <div class="${styles.high}">
              <a href="#"><img class="${styles.logo}", src="https://cloudrivendev.sharepoint.com/sites/Testi/SiteAssets/Logo.png"></a>
            </div>
        </div>`;
    }
  }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
  this._bottomPlaceholder =
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom,
      { onDispose: this._onDispose });

  // The extension should not assume that the expected placeholder is available.
  if (!this._bottomPlaceholder) {
    console.error('The expected placeholder (Bottom) was not found.');
    return;
  }

  if (this.properties) {
    let bottomString: string = this.properties.Bottom;
    if (!bottomString) {
      bottomString = '(Bottom property was not defined.)';
    }

    if (this._bottomPlaceholder.domElement) {
      this._bottomPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
          <div class="${styles.bottom}">
          </div>
        </div>`;
        }
      }
    }
  }

  /* private moveSearch(): void {

    var delayInMilliseconds = 3000; //3seconds

    setTimeout(function() {
      let elements = document.querySelectorAll('.ms-compositeHeader-searchBoxContainer');
      for (var i = 0; i < elements.length; i++)
      elements[i].id = 'abc-' + i;
  
      let newParent = document.getElementById('srch');
      let oldParent = document.getElementById('abc-0');
  
      newParent.appendChild(oldParent);
    }, delayInMilliseconds);
  } */

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}