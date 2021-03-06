import { Component } from '@angular/core';
import { GoOffCanvasService } from '../../../../../../../go-lib/src/public_api';
import { BasicTestComponent } from '../../../ui-kit/components/basic-test/basic-test.component';

@Component({
  templateUrl: './forms.component.html'
})
export class FormsComponent {
  pageTitle: string = 'Forms';
  basicForm: string = this.basicFormTemplate();
  darkForm: string = this.basicFormTemplate(true);

  formHints: string = `
  <form class="go-form">
    <div class="go-container">
      <div class="go-column go-column--100">
        <label for="phone-input-hint" class="go-form__label">Phone Number</label>
        <input class="go-form__input" id="phone-input-hint" placeholder="+0(000)000-0000">
        <p class="go-hint">
          This is the phone number for your work phone.
          Please us the following format: +0(000)000-0000.
          If you have any further questions please contact support.
        </p>
      </div>

      <div class="go-column go-column--100">
        <label for="phone-input-error" class="go-form__label">Phone Number</label>
        <input class="go-form__input go-form__input--error" id="phone-input-error" placeholder="+0(000)000-0000">
        <p class="go-hint go-hint--error">
          <span class="go-hint__status">Error:</span>
          Phone number is a required input.
        </p>
        <p class="go-hint">
          This is the phone number for your work phone.
          Please us the following format: +0(000)000-0000.
          If you have any further questions please contact support.
        </p>
      </div>
    </div>
  </form>
  `;

  inputModifiers: string = `
  <form class="go-form">
    <div class="go-container">
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Normal Input</label>
        <input class="go-form__input" id="normal-input" placeholder="Normal Input" type="text">
      </div>
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Disabled Input</label>
        <input class="go-form__input" id="disabled-input" placeholder="Disabled Input" type="text" disabled>
      </div>
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Error Input</label>
        <input class="go-form__input go-form__input--error" id="error-input" placeholder="Error Input" type="text">
        <p class="go-hint go-hint--error">
          <span class="go-hint__status">Error:</span>
          This input is required. Please fill this out to proceed.
        </p>
      </div>
      <div class="go-column go-column--100">
        <label for="dark-input" class="go-form__label go-form__label--dark">Dark Input</label>
        <input class="go-form__input go-form__input--dark" id="dark-input" placeholder=".go-form__input.go-form__input--dark" type="text">
      </div>
    </div>
  </form>
  `;

  selectModifiers: string = `
  <form class="go-form">
    <div class="go-container">
      <div class="go-column go-column--100">
        <label for="normal-select" class="go-form__label">Normal Select</label>
        <select class="go-form__select" id="normal-select">
          <option value="" disabled selected>.go-form__select</option>
          <option value="1">Option #1</option>
          <option value="2">Option #2</option>
        </select>
      </div>
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Disabled Select</label>
        <select class="go-form__select" id="disabled-select" disabled>
          <option value="" disabled selected>.go-form__select:disabled</option>
          <option value="1">Option #1</option>
          <option value="2">Option #2</option>
        </select>
      </div>
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Error Select</label>
        <select class="go-form__select go-form__select--error" id="error-select">
          <option value="" disabled selected>.go-form__select.go-form__select--error</option>
          <option value="1">Option #1</option>
          <option value="2">Option #2</option>
        </select>
        <p class="go-hint go-hint--error">
          <span class="go-hint__status">Error:</span>
          This input is required. Please select an option to proceed.
        </p>
      </div>
      <div class="go-column go-column--100">
        <label for="dark-select" class="go-form__label go-form__label--dark">
          Dark Select
          <em>(.go-form__label.go-form__label--dark)</em>
        </label>
        <select class="go-form__select go-form__select--dark" id="dark-select">
          <option value="" disabled selected>.go-form__select.go-form__select--dark</option>
          <option value="1">Option #1</option>
          <option value="2">Option #2</option>
        </select>
      </div>
    </div>
  </form>
  `;

  checkboxModifiers: string = `
  <form class="go-form">
    <fieldset class="go-form__fieldset">
      <legend class="go-form__legend">Select a Default Option</legend>
      <div>
        <input class="go-form__checkbox" id="default-checkbox-1" type="checkbox" checked>
        <label for="default-checkbox-1" class="go-form__label go-form__label--inline">
          Option #1
        </label>
      </div>
      <div>
        <input class="go-form__checkbox" id="default-checkbox-2" type="checkbox">
        <label for="default-checkbox-2" class="go-form__label go-form__label--inline">
          Option #2
        </label>
      </div>
    </fieldset>
    <fieldset class="go-form__fieldset" disabled>
      <legend class="go-form__legend">Select a Disabled Option</legend>
      <div>
        <input class="go-form__checkbox" id="disabled-checkbox-1" type="checkbox" checked>
        <label for="disabled-checkbox-1" class="go-form__label go-form__label--inline">
          Option #1
        </label>
      </div>
      <div>
        <input class="go-form__checkbox" id="disabled-checkbox-2" type="checkbox">
        <label for="disabled-checkbox-2" class="go-form__label go-form__label--inline">
          Option #2
        </label>
      </div>
    </fieldset>
    <fieldset class="go-form__fieldset go-form__fieldset--error go-form__fieldset--no-margin">
      <legend class="go-form__legend">Select a Error Option</legend>
      <div>
        <input class="go-form__checkbox" id="error-checkbox-1" type="checkbox" checked>
        <label for="error-checkbox-1" class="go-form__label go-form__label--inline">
          Option #1
        </label>
      </div>
      <div>
        <input class="go-form__checkbox" id="error-checkbox-2" type="checkbox">
        <label for="error-checkbox-2" class="go-form__label go-form__label--inline">
          Option #2
        </label>
        <p class="go-hint go-hint--error">
          <span class="go-hint__status">Error:</span>
          This input is required. Please select an option to proceed.
        </p>
      </div>
    </fieldset>
    <fieldset class="go-form__fieldset go-form__fieldset--dark go-form__fieldset--no-margin">
      <legend class="go-form__legend go-form__legend--dark">Select a dark option</legend>
      <div>
        <input class="go-form__checkbox" id="dark-checkbox-1" type="checkbox" checked>
        <label for="dark-checkbox-1" class="go-form__label go-form__label--dark go-form__label--inline">
          #1 .go-form__label.go-form__label--dark
        </label>
      </div>
      <div>
        <input class="go-form__checkbox" id="dark-checkbox-2" type="checkbox">
        <label for="dark-checkbox-2" class="go-form__label go-form__label--dark go-form__label--inline">
          #2 .go-form__label.go-form__label--dark
        </label>
      </div>
    </fieldset>
  </form>
  `;

  advancedForm: string = `
  <form class="go-form">
    <div class="go-container">
      <div class="go-column go-column--50 go-column--no-padding">
        <div class="go-container">
          <div class="go-column go-column--50">
            <label for="advanced-first-name" class="go-form__label">First Name</label>
            <input class="go-form__input" id="advanced-first-name" placeholder="Jonny" type="text">
          </div>
          <div class="go-column go-column--50">
            <label for="advanced-last-name" class="go-form__label">Last Name</label>
            <input class="go-form__input" id="advanced-last-name" placeholder="Appleseed" type="text">
          </div>
          <div class="go-column go-column--100">
            <label for="advanced-phone" class="go-form__label">Phone Number</label>
            <input class="go-form__input" id="advanced-phone" placeholder="+0(000)000-0000">
            <p class="go-hint">
              This is the phone number for your work phone.
              Please us the following format: +0(000)000-0000.
              If you have any further questions please contact support.
            </p>
          </div>
          <div class="go-column go-column--100">
            <label for="advanced-email" class="go-form__label">Email</label>
            <input class="go-form__input" id="advanced-email" placeholder="your@email.com" type="email">
          </div>
          <div class="go-column go-column--100">
            <label for="advanced-password" class="go-form__label">Password</label>
            <input class="go-form__input" id="advanced-password" placeholder="**************" type="password">
          </div>
          <div class="go-column go-column--100">
            <label for="advanced-bio" class="go-form__label">Personal Bio</label>
            <textarea class="go-form__input"
                      id="advanced-bio"
                      placeholder="Tell us a little bit about yourself."></textarea>
          </div>
        </div>
      </div>

      <div class="go-column go-column--50 go-column--no-padding">
        <fieldset class="go-form__fieldset">
          <legend class="go-form__legend">Employee Information</legend>
          <div class="go-container">
            <div class="go-column go-column--100">
              <label for="advanced-employee-id" class="go-form__label">Employee ID</label>
              <input class="go-form__input"
                      id="advanced-employee-id"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx"
                      type="text">
            </div>
            <div class="go-column go-column--100">
              <label for="country-input" class="go-form__label">Country</label>
              <select class="go-form__select" id="country-input">
                <option value="" disabled selected>Select A Country</option>
                <option value="1">United States</option>
                <option value="2">Canada</option>
              </select>
              <p class="go-hint">
                This setting specifies the country in which the shipping
                address is located.
              </p>
            </div>

            <div class="go-column go-column--100 go-column--no-padding">
              <fieldset class="go-form__fieldset">
                <legend class="go-form__legend">Select a Favorite Character</legend>
                <div>
                  <input class="go-form__checkbox"
                        id="advanced-radio-1"
                        name="character"
                        type="radio">
                  <label for="advanced-radio-1" class="go-form__label go-form__label--inline">
                    Draco Malfoy
                  </label>
                </div>
                <div>
                  <input class="go-form__checkbox"
                          id="advanced-radio-2"
                          name="character"
                          type="radio">
                  <label for="advanced-radio-2" class="go-form__label go-form__label--inline">
                    The Owl
                  </label>
                </div>
                <div>
                  <input class="go-form__checkbox"
                        id="advanced-radio-3"
                        name="character"
                        type="radio">
                  <label for="advanced-radio-3" class="go-form__label go-form__label--inline">
                    Harry Potter
                  </label>
                </div>
                <p class="go-hint">
                  These are all characters from the beloved Harry Potter series
                  written by J.R.R. Tolkien.
                </p>
              </fieldset>
            </div>
            <div class="go-column go-column--100 go-column--no-padding">
              <fieldset class="go-form__fieldset go-form__fieldset--no-margin">
                <legend>Best Golden Girl?</legend>
                <div class="go-container">
                  <div class="go-column go-column--50 go-column--no-padding">
                    <div>
                      <input class="go-form__checkbox"
                          id="advanced-checkbox-1"
                          name="character"
                          type="checkbox"
                          checked>
                      <label for="advanced-checkbox-1" class="go-form__label go-form__label--inline">
                        Rose
                      </label>
                    </div>
                    <div>
                      <input class="go-form__checkbox"
                              id="advanced-checkbox-2"
                              name="character"
                              type="checkbox"
                              checked>
                      <label for="advanced-checkbox-2" class="go-form__label go-form__label--inline">
                        Blanche
                      </label>
                    </div>
                  </div>
                  <div class="go-column go-column--50 go-column--no-padding">
                    <div>
                      <input class="go-form__checkbox"
                              id="advanced-checkbox-3"
                              name="character"
                              type="checkbox"
                              checked>
                      <label for="advanced-checkbox-3" class="go-form__label go-form__label--inline">
                        Sophia
                      </label>
                    </div>
                    <div>
                      <input class="go-form__checkbox"
                              id="advanced-checkbox-4"
                              name="character"
                              type="checkbox"
                              checked>
                      <label for="advanced-checkbox-4" class="go-form__label go-form__label--inline">
                        Dorothy
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="go-column go-column--100">
        <go-button buttonVariant="button">Submit</go-button>
      </div>
    </div>
  </form>
  `;

  constructor(
    private goOffCanvasService: GoOffCanvasService
  ) { }

  public openOffCanvas(): void {
    this.goOffCanvasService.openOffCanvas({
      component: BasicTestComponent,
      bindings: {}
    });
  }

  private basicFormTemplate(useDark: boolean = false): string {
    const formElement: string = useDark ? '<form class="go-form go-form--dark">' : '<form class="go-form">';
    const buttonAttribute: string = useDark ? ' [useDarkTheme]="true"' : '';

    return `
  ${formElement}
    <div class="go-container">
      <div class="go-column go-column--50">
        <label for="first-name-input" class="go-form__label">First Name</label>
        <input class="go-form__input" id="first-name-input" placeholder="Jonny" type="text">
      </div>
      <div class="go-column go-column--50">
        <label for="last-name-input" class="go-form__label">Last Name</label>
        <input class="go-form__input" id="last-name-input" placeholder="Appleseed" type="text">
      </div>
      <div class="go-column go-column--100">
        <label for="email-input" class="go-form__label">Email</label>
        <input class="go-form__input" id="email-input" placeholder="your@email.com" type="email">
      </div>
      <div class="go-column go-column--100">
        <label for="password-input" class="go-form__label">Password</label>
        <input class="go-form__input" id="password-input" placeholder="**************" type="password">
      </div>
      <div class="go-column go-column--100 go-column--no-padding">
        <go-button buttonVariant="positive" buttonIcon="done"${buttonAttribute}>
          Submit
        </go-button>
      </div>
    </div>
  </form>
    `;
  }
}
