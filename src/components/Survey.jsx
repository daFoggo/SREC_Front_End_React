import React from 'react';
import './survey.css';
import { useForm } from "react-hook-form";

const Survey = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
      console.log(data);  // { name: ... }
  }

  return (
    <div class="formbold-main-wrapper">
      <div class="formbold-form-wrapper">
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <img src="/assets/images/survey.webp" />
        </div>
        
        <form form="formSurvey" onSubmit={handleSubmit(onSubmit)}>
          <div class="formbold-mb-6">
            <label for="qusOne" class="formbold-form-label">
              How would you rate your overall experience with our website?
            </label>

            <div class="formbold-radio-flex">
              <div class="formbold-radio-group">
                <label class="formbold-radio-label">
                  <input
                    class="formbold-input-radio"
                    type="radio"
                    name="qusOne"
                    id="qusOne"
                  />
                  Very Good
                  <span class="formbold-radio-checkmark"></span>
                </label>
              </div>

              <div class="formbold-radio-group">
                <label class="formbold-radio-label">
                  <input
                    class="formbold-input-radio"
                    type="radio"
                    name="qusOne"
                    id="qusOne"
                  />
                  Good
                  <span class="formbold-radio-checkmark"></span>
                </label>
              </div>

              <div class="formbold-radio-group">
                <label class="formbold-radio-label">
                  <input
                    class="formbold-input-radio"
                    type="radio"
                    name="qusOne"
                    id="qusOne"
                  />
                  Fair
                  <span class="formbold-radio-checkmark"></span>
                </label>
              </div>

              <div class="formbold-radio-group">
                <label class="formbold-radio-label">
                  <input
                    class="formbold-input-radio"
                    type="radio"
                    name="qusOne"
                    id="qusOne"
                  />
                  Poor
                  <span class="formbold-radio-checkmark"></span>
                </label>
              </div>

              <div class="formbold-radio-group">
                <label class="formbold-radio-label">
                  <input
                    class="formbold-input-radio"
                    type="radio"
                    name="qusOne"
                    id="qusOne"
                  />
                  Vary Poor
                  <span class="formbold-radio-checkmark"></span>
                </label>
              </div>
            </div>
          </div>  

          <div class="formbold-mb-3">
            <label for="message" class="formbold-form-label">
              What should we change in oirder to live up to your expectations?
            </label>
            <textarea
              rows="6"
              name="message"
              id="message"
              class="formbold-form-input"
            ></textarea>
          </div>

          <div>
            <label for="email" class="formbold-form-label"> Email <span>(Only if you want to hear more from us)</span> </label>
            <input
              type="email"
              name="email"
              id="email"
              class="formbold-form-input"
            />
          </div>

          <button class="formbold-btn">Send survey</button>
        </form>
      </div>
    </div>
  )
}

export default Survey;